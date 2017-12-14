import * as plugins from './smartexpress.plugins'
import { Request, Response  } from 'express'


export interface IHandlerFunction {
  (requestArg: Request, responseArg: Response): void
}

export type THttpMethods = 'ALL' | 'GET' | 'POST' | 'PUT' | 'DELETE'

export class Handler {
  httpMethod: THttpMethods
  handlerFunction: IHandlerFunction
  constructor(httpMethodArg: THttpMethods, handlerArg: IHandlerFunction) {
    this.httpMethod = httpMethodArg
    this.handlerFunction = handlerArg
  }
}
