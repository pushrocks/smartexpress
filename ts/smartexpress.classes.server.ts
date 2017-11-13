import * as plugins from './smartexpress.plugins'

import { Route } from './smartexpress.classes.route'

// export types
import { Objectmap } from 'lik'
import { Server as HttpServer } from 'http'

export interface ServerOptions {
  cors: boolean
  forceSsl: boolean
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

  /**
   * adds a Route to the Server
   */
  addRouter (routeArg: Route) {
    this.routeObjectMap.add(routeArg)
  }

  addRoute (routeArg: Route) {
    this.routeObjectMap.add(routeArg)
  }

  async start (port: number) {
    this.expressAppInstance = plugins.express()
    this.httpServer = new plugins.http.Server(this.expressAppInstance)

    // ssl
    if (this.options.forceSsl) {
      this.expressAppInstance.set('forceSSLOptions', {
        enable301Redirects: true,
        trustXFPHeader: true,
        sslRequiredMessage: 'SSL Required.'
      })
      this.expressAppInstance.use(plugins.expressForceSsl)
    }

    // cors
    if (this.options.cors) {
      this.expressAppInstance.use(plugins.cors())
    }
    let done = plugins.smartq.defer()
    this.httpServer.listen(port, '0.0.0.0', () => {
      console.log(`pubapi-1 now listening on ${port}!`)
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
