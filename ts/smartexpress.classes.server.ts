import * as plugins from './smartexpress.plugins'

import { Route } from './smartexpress.classes.route'

// export types
import { Objectmap } from 'lik'
import { Server as HttpServer } from 'http'

export class Server {
  httpServer: plugins.http.Server
  expressAppInstance: plugins.express.Application
  expressServerInstance
  routeObjectMap = new plugins.lik.Objectmap<Route>()

  // do stuff when server is ready
  private startedDeferred = plugins.smartq.defer()
  // tslint:disable-next-line:member-ordering
  startedPromise = this.startedDeferred.promise

  constructor () {
    this.expressAppInstance = plugins.express()
    this.httpServer = new plugins.http.Server(this.expressAppInstance)
  }

  /**
   * adds a Route to the Servr
   */
  addRouter (routeArg: Route) {
    this.routeObjectMap.add(routeArg)
  }

  /**
   * enables cors policy
   */
  enableCors () {
    this.expressAppInstance.use(plugins.cors())
  }

  enableForceSsl () {
    this.expressAppInstance.set('forceSSLOptions', {
      enable301Redirects: true,
      trustXFPHeader: true,
      sslRequiredMessage: 'SSL Required.'
    })
    this.expressAppInstance.use(plugins.expressForceSsl)
  }

  addRoute (routeArg: Route) {
    this.routeObjectMap.add(routeArg)
  }

  async start (port: number) {
    let done = plugins.smartq.defer()
    this.expressServerInstance = this.httpServer.listen(port, '0.0.0.0', () => {
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
