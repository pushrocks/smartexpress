/// <reference types="express" />
import { Handler } from './smartexpress.classes.handler';
import { Server } from './index';
import { Objectmap } from 'lik';
import { IRoute as IExpressRoute } from 'express';
export declare class Route {
    routeString: string;
    handlerObjectMap: Objectmap<Handler>;
    expressMiddlewareObjectMap: Objectmap<any>;
    expressRoute: IExpressRoute;
    constructor(ServerArg: Server, routeStringArg: string);
    /**
     * add a handler to do something with requests
     * @param handlerArg
     */
    addHandler(handlerArg: Handler): void;
    /**
     * add a express middleware
     * @param middlewareArg
     */
    addExpressMiddleWare(middlewareArg: any): void;
}
