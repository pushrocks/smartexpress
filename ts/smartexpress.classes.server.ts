import * as plugins from './smartexpress.plugins'

import { Route } from './smartexpress.classes.route'

import { Objectmap } from 'lik'

export class Server  {
  expressAppInstance: plugins.express.Application
  expressServerInstance
  private startedDeferred = plugins.smartq.defer()
  startedPromise = this.startedDeferred.promise

  routeObjectMap = new plugins.lik.Objectmap<Route>()

  constructor() {
    this.expressAppInstance = plugins.express()
  }

  /**
   * enables cors policy
   */
  enableCors() {
    this.expressAppInstance.use(plugins.cors())
  }

  enableForceSsl() {
    this.expressAppInstance.set('forceSSLOptions', {
      enable301Redirects: true,
      trustXFPHeader: true,
      sslRequiredMessage: 'SSL Required.'
    })
    this.expressAppInstance.use(plugins.expressForceSsl)
  }

  addRoute(routeArg: Route) {
    this.routeObjectMap.add(routeArg)
  }

  async start(port: number) {
    let done = plugins.smartq.defer()
    this.expressServerInstance = this.expressAppInstance.listen(port, '0.0.0.0', () => {
      console.log(`pubapi-1 now listening on ${port}!`)
      this.startedDeferred.resolve()
      done.resolve()
    })
    return await done.promise
  }

  async stop() {
    this.expressServerInstance.close()
  }

}
