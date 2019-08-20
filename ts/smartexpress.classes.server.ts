import * as plugins from './smartexpress.plugins';

import { Route } from './smartexpress.classes.route';
import { Handler } from './smartexpress.classes.handler';

// export types
import { Objectmap } from '@pushrocks/lik';
import { Server as HttpServer } from 'http';
import { setupRendertron } from './smartexpress.tools.rendertron';
import { setupRobots } from './smartexpress.tools.robots';
import { setupManifest } from './smartexpress.tools.manifest';
import { Sitemap } from './smartexpress.classes.sitemap';

export interface IServerOptions {
  cors: boolean;
  defaultAnswer?: () => Promise<string>;
  forceSsl?: boolean;
  manifest?: plugins.smartmanifest.ISmartManifestConstructorOptions;
  port?: number | string;
  publicKey?: string;
  privateKey?: string;
  renderTronUrl?: string;
  robots?: 'off' | 'standard' | 'custom';
  domain?: string;
}

export type TServerStatus = 'initiated' | 'running' | 'stopped';

/**
 * can be used to spawn a server to answer http/https calls
 * for constructor options see [[IServerOptions]]
 */
export class Server {
  public httpServer: plugins.http.Server | plugins.https.Server;
  public expressAppInstance: plugins.express.Application;
  public routeObjectMap = new plugins.lik.Objectmap<Route>();
  public options: IServerOptions;
  public serverStatus: TServerStatus = 'initiated';

  public sitemap = new Sitemap();

  // do stuff when server is ready
  private startedDeferred = plugins.smartpromise.defer();
  // tslint:disable-next-line:member-ordering
  public startedPromise = this.startedDeferred.promise;

  constructor(optionsArg: IServerOptions) {
    this.options = {
      ...optionsArg
    };
  }

  public updateServerOptions(optionsArg: IServerOptions) {
    Object.assign(this.options, optionsArg);
  }

  public addRoute(routeStringArg: string, handlerArg?: Handler) {
    const route = new Route(this, routeStringArg);
    if (handlerArg) {
      route.addHandler(handlerArg);
    }
    this.routeObjectMap.add(route);
    return route;
  }

  public async start(portArg: number | string = this.options.port) {
    const done = plugins.smartpromise.defer();

    if (typeof portArg === 'string') {
      portArg = parseInt(portArg);
    }

    this.expressAppInstance = plugins.express();
    if (!this.httpServer && (!this.options.privateKey || !this.options.publicKey)) {
      console.log('Got no SSL certificates. Please ensure encryption using e.g. a reverse proxy');
      this.httpServer = plugins.http.createServer(this.expressAppInstance);
    } else if (!this.httpServer) {
      console.log('Got SSL certificate. Using it for the http server');
      this.httpServer = plugins.https.createServer(
        {
          key: this.options.privateKey,
          cert: this.options.publicKey
        },
        this.expressAppInstance
      );
    } else {
      console.log('Using externally supplied http server');
    }

    this.expressAppInstance.use(plugins.bodyParser.json()); // for parsing application/json
    this.expressAppInstance.use(plugins.bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    this.expressAppInstance.use((req, res, next) => {
      req.setTimeout(10000, () => {
        console.log(`the request for ${req.path} took too long and has therefore timed out`);
      });
      next();
    });
    // forceSsl
    if (this.options.forceSsl) {
      this.expressAppInstance.set('forceSSLOptions', {
        enable301Redirects: true,
        trustXFPHeader: true,
        sslRequiredMessage: 'SSL Required.'
      });
      this.expressAppInstance.use(plugins.expressForceSsl);
    }

    // helmet
    this.expressAppInstance.use(plugins.helmet());

    // cors
    if (this.options.cors) {
      this.expressAppInstance.use(plugins.cors());
    }

    // rendertron
    if (this.options.renderTronUrl) {
      await setupRendertron(this);
    }

    // robots
    if (this.options.robots === 'standard' && this.options.domain) {
      await setupRobots(this.expressAppInstance, this.options.domain);
    }

    // manifest.json
    if (this.options.manifest) {
      await setupManifest(this.expressAppInstance, this.options.manifest);
    }

    // set up routes in for express
    await this.routeObjectMap.forEach(async routeArg => {
      const expressRoute = this.expressAppInstance.route(routeArg.routeString);
      routeArg.handlerObjectMap.forEach(async handler => {
        switch (handler.httpMethod) {
          case 'GET':
            expressRoute.get(handler.handlerFunction);
            return;
          case 'POST':
            expressRoute.post(handler.handlerFunction);
            return;
          case 'PUT':
            expressRoute.put(handler.handlerFunction);
            return;
          case 'ALL':
            expressRoute.all(handler.handlerFunction);
            return;
          case 'DELETE':
            expressRoute.delete(handler.handlerFunction);
            return;
          default:
            return;
        }
      });
    });

    if (this.options.defaultAnswer) {
      this.expressAppInstance.get('/', async (request, response) => {
        response.send(await this.options.defaultAnswer());
      });
    }

    // finally listen on a port
    this.httpServer.listen(portArg, '0.0.0.0', () => {
      console.log(`now listening on ${portArg}!`);
      this.startedDeferred.resolve();
      this.serverStatus = 'running';
      done.resolve();
    });
    return await done.promise;
  }

  public getHttpServer() {
    return this.httpServer;
  }

  public async stop() {
    const done = plugins.smartpromise.defer();
    if (this.httpServer) {
      this.httpServer.close(() => {
        done.resolve();
        this.serverStatus = 'stopped';
      });
    } else {
      throw new Error('There is no Server to be stopped. Have you started it?');
    }
    return await done.promise;
  }
}
