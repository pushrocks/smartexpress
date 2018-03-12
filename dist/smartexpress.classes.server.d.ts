/// <reference types="node" />
/// <reference types="express" />
import * as plugins from './smartexpress.plugins';
import { Route } from './smartexpress.classes.route';
import { Handler } from './smartexpress.classes.handler';
export interface ServerOptions {
    cors: boolean;
    forceSsl: boolean;
    port?: number | string;
    defaultAnswer?: string;
}
export declare type TServerStatus = 'initiated' | 'running' | 'stopped';
export declare class Server {
    httpServer: plugins.http.Server;
    expressAppInstance: plugins.express.Application;
    routeObjectMap: plugins.lik.Objectmap<Route>;
    options: ServerOptions;
    serverStatus: TServerStatus;
    private startedDeferred;
    startedPromise: Promise<{}>;
    constructor(optionsArg: ServerOptions);
    updateServerOptions(optionsArg: ServerOptions): void;
    addRoute(routeStringArg: string, handlerArg?: Handler): Route;
    start(portArg?: number | string): Promise<{}>;
    getHttpServer(): plugins.http.Server;
    stop(): Promise<{}>;
}
