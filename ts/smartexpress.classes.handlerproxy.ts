import * as plugins from './smartexpress.plugins';
import { Handler } from './smartexpress.classes.handler';

import * as interfaces from './interfaces';

export class HandlerProxy extends Handler {
  /**
   * The constuctor of HandlerProxy
   * @param remoteMountPointArg
   */
  constructor(
    remoteMountPointArg: string,
    optionsArg?: {
      responseModifier?: interfaces.TResponseModifier;
      headers?: { [key: string]: string };
    }
  ) {
    super('ALL', async (req, res) => {
      const relativeRequestPath = req.path.slice(req.route.path.length - 1);
      const proxyRequestUrl = remoteMountPointArg + relativeRequestPath;
      console.log(`proxy ${req.path} to ${proxyRequestUrl}`);
      let proxiedResponse: plugins.smartrequest.IExtendedIncomingMessage;
      try {
        proxiedResponse = await plugins.smartrequest.request(proxyRequestUrl, {
          method: req.method,
          autoJsonParse: false,
        });
      } catch {
        res.end('failed to fullfill request');
        return;
      }
      for (const header of Object.keys(proxiedResponse.headers)) {
        res.set(header, proxiedResponse.headers[header] as string);
      }

      // set additional headers
      if (optionsArg && optionsArg.headers) {
        for (const key of Object.keys(optionsArg.headers)) {
          res.set(key, optionsArg.headers[key]);
        }
      }

      let responseToSend: string = proxiedResponse.body;
      if (typeof responseToSend !== 'string') {
        console.log(proxyRequestUrl);
        console.log(responseToSend);
        throw new Error(`Proxied response is not a string, but ${typeof responseToSend}`);
      }

      if (optionsArg && optionsArg.responseModifier) {
        const modifiedResponse = await optionsArg.responseModifier({
          headers: res.getHeaders(),
          path: req.path,
          responseContent: responseToSend,
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
        responseToSend = modifiedResponse.responseContent;
      }

      res.status(200);
      res.write(responseToSend);
      res.end();
    });
  }
}
