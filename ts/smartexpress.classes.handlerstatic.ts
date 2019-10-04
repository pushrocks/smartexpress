import * as plugins from './smartexpress.plugins';
import * as interfaces from './interfaces';

import { Handler } from './smartexpress.classes.handler';

export class HandlerStatic extends Handler {
  constructor(
    pathArg: string,
    optionsArg?: {
      responseModifier?: interfaces.TResponseModifier;
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

      res.type(parsedPath.ext);

      const headers = res.getHeaders();

      // lets modify the response at last
      if (optionsArg && optionsArg.responseModifier) {
        const modifiedResponse = await optionsArg.responseModifier({
          headers: res.getHeaders(),
          path: filePath,
          responseContent: fileString
        });

        // headers
        for (const key of Object.keys(res.getHeaders())) {
          if (!modifiedResponse.headers[key]) {
            res.removeHeader(key);
          }
        }

        for (const key of Object.keys(modifiedResponse.headers)) {
          res.setHeader(key, modifiedResponse.headers[key]);
        }

        // responseContent
        fileString = modifiedResponse.responseContent;
      }

      res.status(200);
      res.write(fileString);
      res.end();
    });
  }
}
