/// <reference types="node" />
/// <reference types="express" />
import * as plugins from './smartexpress.plugins';
import { Route } from './smartexpress.classes.route';
import { Objectmap } from 'lik';
import { Server as HttpServer } from 'http';
export interface ServerOptions {
    cors: boolean;
    forceSsl: boolean;
}
export declare class Server {
    httpServer: plugins.http.Server;
    expressAppInstance: plugins.express.Application;
    routeObjectMap: Objectmap<Route>;
    options: ServerOptions;
    private startedDeferred;
    startedPromise: Promise<{}>;
    constructor(optionsArg: ServerOptions);
    /**
     * adds a Route to the Server
     */
    addRouter(routeArg: Route): void;
    addRoute(routeArg: Route): void;
    start(port: number): Promise<{}>;
    getHttpServer(): HttpServer;
    stop(): Promise<{}>;
}
