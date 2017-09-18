/// <reference types="express" />
import * as plugins from './smartexpress.plugins';
import { Route } from './smartexpress.classes.route';
import { Objectmap } from 'lik';
export declare class Server {
    expressAppInstance: plugins.express.Application;
    expressServerInstance: any;
    private startedDeferred;
    startedPromise: Promise<{}>;
    routeObjectMap: Objectmap<Route>;
    constructor();
    /**
     * enables cors policy
     */
    enableCors(): void;
    enableForceSsl(): void;
    addRoute(routeArg: Route): void;
    start(port: number): Promise<{}>;
    stop(): Promise<void>;
}
