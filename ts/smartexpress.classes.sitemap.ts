import { Server } from './smartexpress.classes.server';
import { Handler } from './smartexpress.classes.handler';
import * as plugins from './smartexpress.plugins';
import { IUrlInfo } from '@pushrocks/smartsitemap';

export class Sitemap {
  public smartexpressRef: Server;
  public smartSitemap = new plugins.smartsitemap.SmartSitemap();
  public urls: plugins.smartsitemap.IUrlInfo[] = [];

  /**
   * handles the normal sitemap request
   */
  public sitemapHandler = new Handler('GET', async (req, res) => {
    const sitemapXmlString = await this.smartSitemap.createSitemapFromUrlInfoArray(this.urls);
    res.type('.xml');
    res.write(sitemapXmlString);
    res.end();
  });

  /**
   * handles the sitemap-news request
   */
  public sitemapNewsHandler = new Handler('GET', async (req, res) => {
    if (!this.smartexpressRef.options.articleGetterFunction) {
      res.status(500);
      res.write('no article getter function defined.');
      res.end();
      return;
    }
    const sitemapNewsXml = await this.smartSitemap.createSitemapNewsFromArticleArray(
      await this.smartexpressRef.options.articleGetterFunction()
    );
    res.type('.xml');
    res.write(sitemapNewsXml);
    res.end();
  });

  constructor(smartexpressRefArg: Server) {
    this.smartexpressRef = smartexpressRefArg;
    this.smartexpressRef.addRouteBefore('/sitemap', this.sitemapHandler);
    this.smartexpressRef.addRouteBefore('/sitemap-news', this.sitemapNewsHandler);

    // lets set the default url
    if (this.smartexpressRef.options.domain) {
      this.urls.push({
        url: `https://${this.smartexpressRef.options.domain}/`,
        timestamp: Date.now() - plugins.smarttime.getMilliSecondsFromUnits({ hours: 2 }),
        frequency: 'daily',
      });
    }
  }

  /**
   * replaces the current urlsArray
   * @param urlsArg
   */
  public replaceUrls(urlsArg: IUrlInfo[]) {
    this.urls = urlsArg;
  }

  /**
   * adds urls to the current set of urls
   */
  public addUrls(urlsArg: IUrlInfo[]) {
    this.urls = this.urls.concat(this.urls, urlsArg);
  }
}
