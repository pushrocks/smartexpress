import * as plugins from './smartexpress.plugins';
import { Handler } from './smartexpress.classes.handler';

import * as interfaces from './interfaces';

export class HandlerTypedRouter extends Handler {
  /**
   * The constuctor of HandlerProxy
   * @param remoteMountPointArg
   */
  constructor(
    typedrouter: plugins.typedrequest.TypedRouter
  ) {
    super('POST', async (req, res) => {
      const response = await typedrouter.routeAndAddResponse(req.body);
      res.json(response);
    });
  }
}
