import * as plugins from './smartexpress.plugins';

import { Handler } from './smartexpress.classes.handler';

export class HandlerStatic extends Handler {
  constructor(pathArg: string) {
    super("GET", async (req, res) => {
      const filePath: string = req.params.filePath;
      const joinedPath = plugins.path.join(pathArg, filePath);
      const parsedPath = plugins.path.parse(joinedPath);

      // important security checks
      if (
        filePath.includes('..') || // don't allow going up the filePath
        filePath.includes('~') || // don't allow referencing of home directory
        !joinedPath.startsWith(pathArg) // make sure the joined path is within the directory
      ) {
        res.writeHead(500);
        res.end();
        return;
      }
      // lets actually care about serving
      const fileString = plugins.smartfile.fs.toStringSync(joinedPath);
      res.type(parsedPath.ext);
      res.writeHead(200);
      res.send(fileString);
      res.end();
    });
  }
}