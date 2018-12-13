import * as plugins from './smartexpress.plugins';

import { Handler } from './smartexpress.classes.handler';

export class HandlerStatic extends Handler {
  constructor(pathArg: string) {
    super("GET", async (req, res) => {
      const filePath: string = req.params.filePath;
      const joinedPath = plugins.path.join(pathArg, filePath);

      // important security checks
      if (
        filePath.includes('..') || // don't allow going up the filePath
        filePath.includes('~') || // don't allow referencing of home directory
        !joinedPath.startsWith(pathArg) // make sure the joined path is within the directory
      ) {
        res.status(500);
        res.end();
        return;
      }
      const fileString = plugins.smartfile.fs.toStringSync(joinedPath);
      res.send(fileString);
      res.end();
    });
  }
}