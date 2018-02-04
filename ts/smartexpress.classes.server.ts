import * as plugins from './smartexpress.plugins'

import { Route } from './smartexpress.classes.route'
import { Handler } from './smartexpress.classes.handler'

// export types
import { Objectmap } from 'lik'
import { Server as HttpServer } from 'http'
import { express } from './smartexpress.plugins';

export interface ServerOptions {
  cors: boolean
  forceSsl: boolean
  port?: number | string
  defaultAnswer?: string
}

export class Server {
  httpServer: plugins.http.Server
  expressAppInstance: plugins.express.Application
  routeObjectMap = new plugins.lik.Objectmap<Route>()
  options: ServerOptions


  // do stuff when server is ready
  private startedDeferred = plugins.smartq.defer()
  // tslint:disable-next-line:member-ordering
  startedPromise = this.startedDeferred.promise

  constructor (optionsArg: ServerOptions) {
    this.options = optionsArg
  }

  updateServerOptions(optionsArg: ServerOptions) {
    Object.assign(this.options, optionsArg)
  }

  addRoute (routeStringArg: string, handlerArg?: Handler) {
    let route = new Route(this, routeStringArg)
    if(handlerArg) {
      route.addHandler(handlerArg)
    }
    this.routeObjectMap.add(route)
    return route
  }

  async start (portArg: number | string = this.options.port) {
    let done = plugins.smartq.defer()
    
    if(typeof portArg === 'string') {
      portArg = parseInt(portArg)
    }

    this.expressAppInstance = plugins.express()
    this.httpServer = new plugins.http.Server(this.expressAppInstance)

    this.expressAppInstance.use(plugins.bodyParser.json()) // for parsing application/json
    this.expressAppInstance.use(plugins.bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    // ssl
    if (this.options.forceSsl) {
      this.expressAppInstance.set('forceSSLOptions', {
        enable301Redirects: true,
        trustXFPHeader: true,
        sslRequiredMessage: 'SSL Required.'
      })
      this.expressAppInstance.use(plugins.expressForceSsl)
    }

    // helmet
    this.expressAppInstance.use(plugins.helmet())

    // cors
    if (this.options.cors) {
      this.expressAppInstance.use(plugins.cors())
    }
    
    // set up routes in for express
    await this.routeObjectMap.forEach(async routeArg => {
      let expressRoute = this.expressAppInstance.route(routeArg.routeString)
      routeArg.handlerObjectMap.forEach(async handler => {
        switch (handler.httpMethod) {
          case 'GET':
            expressRoute.get(handler.handlerFunction)
            return
          case 'POST':
            expressRoute.post(handler.handlerFunction)
            return
          case 'PUT':
            expressRoute.put(handler.handlerFunction)
            return
          case 'ALL':
            expressRoute.all(handler.handlerFunction)
            return
          case 'DELETE':
            expressRoute.delete(handler.handlerFunction)
            return
          default:
            return
        }
      })
    })

    if (this.options.defaultAnswer) {
      this.expressAppInstance.get('/', (request, response) => {
        response.send(this.options.defaultAnswer)
      })
    }

    // finally listen on a port
    this.httpServer.listen(portArg, '0.0.0.0', () => {
      console.log(`pubapi-1 now listening on ${portArg}!`)
      this.startedDeferred.resolve()
      done.resolve()
    })
    return await done.promise
  }

  getHttpServer () {
    return this.httpServer
  }

  async stop () {
    let done = plugins.smartq.defer()
    this.httpServer.close(() => {
      done.resolve()
    })
    return await done.promise
  }

}
