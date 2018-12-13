import * as plugins from './smartexpress.plugins';

import { Handler } from './smartexpress.classes.handler';

export class HandlerStatic extends Handler {
  constructor(pathArg: string) {
    super("GET", async (req, res) => {
      // lets compute some paths
      const filePath: string = req.path.slice(req.route.path.length - 1);
      console.log(filePath);
      const joinedPath = plugins.path.join(pathArg, filePath);
      const parsedPath = plugins.path.parse(joinedPath);

      // important security checks
      if (
        req.path.includes('..') || // don't allow going up the filePath
        req.path.includes('~') || // don't allow referencing of home directory
        !joinedPath.startsWith(pathArg) // make sure the joined path is within the directory
      ) {
        res.writeHead(500);
        res.end();
        return;
      }

      // lets actually care about serving, if security checks pass
      let fileString: string;
      try {
        fileString = plugins.smartfile.fs.toStringSync(joinedPath);
      } catch (err) {
        res.writeHead(500);
        res.end('File not found!');
        return;
      }
      res.type(parsedPath.ext);
      res.status(200);
      res.send(fileString);
      res.end();
    });
  }
}