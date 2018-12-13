import * as plugins from './smartexpress.plugins';

import { Handler } from './smartexpress.classes.handler';

export class HandlerStatic extends Handler {
  constructor(pathArg: string) {
    super("GET", async (req, res) => {
      const filePath: string = req.params.filePath;
      if (
        filePath.includes('..') ||
        filePath.includes('~')
      ) {
        res.status(500);
        res.end();
        return;
      }
      const fileString = plugins.smartfile.fs.toStringSync(plugins.path.join(pathArg, filePath));
      res.send(fileString);
      res.end();
    });
  }
}