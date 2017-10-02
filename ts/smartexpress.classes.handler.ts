import * as plugins from './smartexpress.plugins'

export interface IHandlerFunction {
  (requestArg, responseCallbackArg): void
}

export class Handler {
  handlerFunction: IHandlerFunction
  constructor(handlerArg: IHandlerFunction) {
    this.handlerFunction = handlerArg
  }
}
