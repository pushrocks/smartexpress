import { Handler } from './smartexpress.classes.handler';
import { Server } from './smartexpress.classes.server';
import * as plugins from './smartexpress.plugins';

export class Feed {
  public smartexpressRef: Server;
  public smartfeedInstance = new plugins.smartfeed.Smartfeed();

  public feedHandler = new Handler('GET', async (req, res) => {
    if (!this.smartexpressRef.options.feedMetadata) {
      res.status(500);
      res.write('feed metadata is missing');
      res.end();
      return;
    }
    if (!this.smartexpressRef.options.articleGetterFunction) {
      res.status(500);
      res.write('no article getter function defined.');
      res.end();
      return;
    }
    const xmlString = await this.smartfeedInstance.createFeedFromArticleArray(
      this.smartexpressRef.options.feedMetadata,
      await this.smartexpressRef.options.articleGetterFunction()
    );
    res.type('.xml');
    res.write(xmlString);
    res.end();
  });

  constructor(smartexpressRefArg: Server) {
    this.smartexpressRef = smartexpressRefArg;
    this.smartexpressRef.addRoute('/feed', this.feedHandler);
  }
}
