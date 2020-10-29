import { Server } from './smartexpress.classes.server';
import * as plugins from './smartexpress.plugins';

export class Feed {
  public articles: plugins.tsclass.content.IArticle;
  public smartfeedInstance = new plugins.smartfeed.Smartfeed();

  constructor(smartexpressInstance: Server) {
    
  }
}