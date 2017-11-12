import * as plugins from './smartexpress.plugins'
import { Handler } from './smartexpress.classes.handler'

export class Route {
  routeString: string
  handler: Handler = null
  constructor(routeStringArg: string) {
    this.routeString = routeStringArg
  }

  addHandler (handlerArg: Handler) {
    this.handler = handlerArg
  }
}
