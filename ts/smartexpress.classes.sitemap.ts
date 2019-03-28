import * as plugins from './smartexpress.plugins';

export interface ISitePackage {
  url: string;
  changeFreq: 'daily' | 'monthly'
}

export class Sitemap {
  /**
   * the main sitePackageStore
   */
  pagePackages: ISitePackage[] = [];

  public getSitemap(domainArg: string) {
    const sitemap = plugins.sitemap.createSitemap ({
      hostname: `http://${domainArg}`,
      cacheTime: 600000,        // 600 sec - cache purge period
      urls: (() => {
        const urlArray = [];
        for (const pagePackage of this.pagePackages) {
          urlArray.push({
            url: pagePackage.url,
            changefreq: pagePackage.changeFreq
          });
        }
        return urlArray;
      })()
    });
  }
}