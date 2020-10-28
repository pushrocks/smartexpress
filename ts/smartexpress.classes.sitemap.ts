import { Server } from './smartexpress.classes.server';
import { Handler } from './smartexpress.classes.handler';
import * as plugins from './smartexpress.plugins';
import { IUrlInfo } from '@pushrocks/smartsitemap';

export class Sitemap {
  public smartexpressRef: Server;
  public smartSitemap = new plugins.smartsitemap.SmartSitemap();

  public newsFeedUrl: string;
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
    let sitemapNewsXml: string;
    // tslint:disable-next-line: prefer-conditional-expression
    if (this.newsFeedUrl) {
      sitemapNewsXml = await this.smartSitemap.createSitemapNewsFromFeedUrl(this.newsFeedUrl);
    } else {
      sitemapNewsXml = await this.smartSitemap.createSitemapNewsFromArticleArray([]);
    }
    res.type('.xml');
    res.write(sitemapNewsXml);
    res.end();
  });

  constructor(smartexpressRefArg: Server) {
    this.smartexpressRef = smartexpressRefArg;
    smartexpressRefArg.addRoute('/sitemap', this.sitemapHandler);
    smartexpressRefArg.addRoute('/sitemap-news', this.sitemapNewsHandler);

    // lets set the default url
    if (this.smartexpressRef.options.domain) {
      this.urls.push({
        url: `https://${this.smartexpressRef.options.domain}`,
        timestamp: Date.now() - plugins.smarttime.getMilliSecondsFromUnits({hours: 2}),
        frequency: 'daily'
      });
    }
  }

  /**
   * replaces the current urlsArray
   * @param urlsArg 
   */
  public replaceUrls(urlsArg: IUrlInfo[]) {
    this.urls = urlsArg
  }

  /**
   * adds urls to the current set of urls
   */
  public addUrls(urlsArg: IUrlInfo[]) {
    this.urls = this.urls.concat(this.urls, urlsArg);
  }

  /**
   * set news feed url
   */
  public setNewsFeedUrl (urlArg: string) {
    this.newsFeedUrl = urlArg;
  }
}
