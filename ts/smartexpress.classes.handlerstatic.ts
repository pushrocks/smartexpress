import * as plugins from './smartexpress.plugins';
import * as interfaces from './interfaces';

import { Handler } from './smartexpress.classes.handler';

export class HandlerStatic extends Handler {
  constructor(
    pathArg: string,
    optionsArg?: {
      responseModifier?: interfaces.TResponseModifier<{
        path: string;
        responseContent: string;
      }>;
      headers?: { [key: string]: string };
    }
  ) {
    super('GET', async (req, res) => {
      // lets compute some paths
      let filePath: string = req.path.slice(req.route.path.length - 1);
      if (filePath === '') {
        console.log('replaced root with index.html');
        filePath = 'index.html';
      }
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

      // set additional headers
      if (optionsArg && optionsArg.headers) {
        for (const key of Object.keys(optionsArg.headers)) {
          res.set(key, optionsArg.headers[key]);
        }
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

      if (optionsArg && optionsArg.responseModifier) {
        fileString = await optionsArg.responseModifier({
          path: filePath,
          responseContent: fileString
        });
      }

      res.type(parsedPath.ext);
      res.status(200);
      res.write(fileString);
      res.end();
    });
  }
}
