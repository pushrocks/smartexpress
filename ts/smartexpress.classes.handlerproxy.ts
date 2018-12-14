import * as plugins from './smartexpress.plugins';
import { Handler } from './smartexpress.classes.handler';

export class HandlerProxy extends Handler {
  /**
   * The constuctor of HandlerProxy
   * @param remoteMountPointArg
   */
  constructor(remoteMountPointArg: string) {
    super('ALL', async (req, res) => {
      const relativeRequestPath = req.path.slice(req.route.path.length - 1);
      const proxyRequestUrl = remoteMountPointArg + relativeRequestPath;
      const proxiedResponse = await plugins.smartrequest.request(proxyRequestUrl, {
        method: req.method
      });
    });
  }
}
