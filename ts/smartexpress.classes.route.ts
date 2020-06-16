import * as plugins from './smartexpress.plugins';
import { Handler } from './smartexpress.classes.handler';
import { Server } from './index';

import { ObjectMap } from '@pushrocks/lik';
import { IRoute as IExpressRoute } from 'express';

export class Route {
  public routeString: string;
  public handlerObjectMap = new ObjectMap<Handler>();
  public expressMiddlewareObjectMap = new ObjectMap<any>();
  public expressRoute: IExpressRoute; // will be set to server route on server start
  constructor(ServerArg: Server, routeStringArg: string) {
    this.routeString = routeStringArg;
  }

  /**
   * add a handler to do something with requests
   * @param handlerArg
   */
  public addHandler(handlerArg: Handler) {
    this.handlerObjectMap.add(handlerArg);
  }

  /**
   * add a express middleware
   * @param middlewareArg
   */
  public addExpressMiddleWare(middlewareArg) {
    this.expressMiddlewareObjectMap.add(middlewareArg);
  }
}
