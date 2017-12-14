import * as plugins from './smartexpress.plugins'
import { Handler } from './smartexpress.classes.handler'
import { Server } from './index';

import { Objectmap } from 'lik';
import { IRoute as IExpressRoute } from 'express'

export class Route {
  routeString: string
  handlerObjectMap = new Objectmap<Handler>()
  expressMiddlewareObjectMap = new Objectmap<any>()
  expressRoute: IExpressRoute // will be set to server route on server start
  constructor(ServerArg: Server,routeStringArg: string) {
    this.routeString = routeStringArg
  }

  /**
   * add a handler to do something with requests
   * @param handlerArg
   */
  addHandler (handlerArg: Handler) {
    this.handlerObjectMap.add(handlerArg)
  }

  /**
   * add a express middleware
   * @param middlewareArg
   */
  addExpressMiddleWare (middlewareArg) {
    this.expressMiddlewareObjectMap.add(middlewareArg)
  }
}
