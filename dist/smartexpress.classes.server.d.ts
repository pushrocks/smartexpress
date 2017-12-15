/// <reference types="node" />
/// <reference types="express" />
import * as plugins from './smartexpress.plugins';
import { Route } from './smartexpress.classes.route';
import { Handler } from './smartexpress.classes.handler';
import { Objectmap } from 'lik';
import { Server as HttpServer } from 'http';
export interface ServerOptions {
    cors: boolean;
    forceSsl: boolean;
    port?: number | string;
    defaultAnswer?: string;
}
export declare class Server {
    httpServer: plugins.http.Server;
    expressAppInstance: plugins.express.Application;
    routeObjectMap: Objectmap<Route>;
    options: ServerOptions;
    private startedDeferred;
    startedPromise: Promise<{}>;
    constructor(optionsArg: ServerOptions);
    updateServerOptions(optionsArg: ServerOptions): void;
    addRoute(routeStringArg: string, handlerArg?: Handler): Route;
    start(portArg?: number | string): Promise<{}>;
    getHttpServer(): HttpServer;
    stop(): Promise<{}>;
}
