/// <reference types="node" />
/// <reference types="express" />
import * as plugins from './smartexpress.plugins';
import { Route } from './smartexpress.classes.route';
import { Objectmap } from 'lik';
export declare class Server {
    httpServer: plugins.http.Server;
    expressAppInstance: plugins.express.Application;
    expressServerInstance: any;
    routeObjectMap: Objectmap<Route>;
    private startedDeferred;
    startedPromise: Promise<{}>;
    constructor();
    /**
     * adds a Route to the Servr
     */
    addRouter(routeArg: Route): void;
    /**
     * enables cors policy
     */
    enableCors(): void;
    enableForceSsl(): void;
    addRoute(routeArg: Route): void;
    start(port: number): Promise<{}>;
    addSocketIO(socketArg: any): void;
    stop(): Promise<{}>;
}
