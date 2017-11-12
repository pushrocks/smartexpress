import { Handler } from './smartexpress.classes.handler';
export declare class Route {
    routeString: string;
    handler: Handler;
    constructor(routeStringArg: string);
    addHandler(handlerArg: Handler): void;
}
