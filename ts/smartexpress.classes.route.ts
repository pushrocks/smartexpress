import * as plugins from './smartexpress.plugins'
import { Handler } from './smartexpress.classes.handler'

export class Route {
  routeString: string
  handler: Handler = null
  constructor(routeStringArg: string) {
    this.routeString = routeStringArg
  }

  /**
   * add a handler to do something with requests
   * @param handlerArg
   */
  addHandler (handlerArg: Handler) {
    this.handler = handlerArg
  }

  /**
   * add a express middleware
   * @param middlewareArg
   */
  addExpressMiddleWare (middlewareArg) {

  }
}
