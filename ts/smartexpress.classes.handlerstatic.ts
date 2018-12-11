import * as plugins from './smartexpress.plugins';

import { Handler } from './smartexpress.classes.handler';

export class HandlerStatic extends Handler {
  constructor(pathArg: string) {
    super("GET", (req, res) => {
      const serveMiddleWare = plugins.serveStatic(pathArg, {
        index: false
      });
      serveMiddleWare(req, res, plugins.finalHandler(req, res));
    });
  }
}