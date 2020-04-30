import * as plugins from './smartexpress.plugins';

export interface ISitePackage {
  url: string;
  changeFreq: 'daily' | 'monthly';
}

export class Sitemap {
  /**
   * the main sitePackageStore
   */
  pagePackages: ISitePackage[] = [];

  public getSitemap(domainArg: string) {
    // implement sitemap
  }
}
