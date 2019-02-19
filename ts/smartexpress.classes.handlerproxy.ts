import * as plugins from './smartexpress.plugins';
import { Handler } from './smartexpress.classes.handler';

export class HandlerProxy extends Handler {
  /**
   * The constuctor of HandlerProxy
   * @param remoteMountPointArg
   */
  constructor(
    remoteMountPointArg: string,
    optionsArg?: {
      headers?: { [key: string]: string };
    }
  ) {
    super('ALL', async (req, res) => {
      const relativeRequestPath = req.path.slice(req.route.path.length - 1);
      const proxyRequestUrl = remoteMountPointArg + relativeRequestPath;
      const proxiedResponse = await plugins.smartrequest.request(proxyRequestUrl, {
        method: req.method
      });
      for (const header of Object.keys(proxiedResponse.headers)) {
        res.set(header, proxiedResponse.headers[header] as string);
      }

      // set additional headers
      if (optionsArg && optionsArg.headers) {
        for (const key of Object.keys(optionsArg.headers)) {
          res.set(key, optionsArg.headers[key]);
        }
      }

      res.status(200);
      res.send(proxiedResponse.body);
      res.end();
    });
  }
}
