import { Handler } from './smartexpress.classes.handler';
export declare class Route {
    routeString: string;
    handler: Handler;
    constructor(routeStringArg: string);
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
