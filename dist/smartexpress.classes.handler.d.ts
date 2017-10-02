export interface IHandlerFunction {
    (requestArg: any, responseCallbackArg: any): void;
}
export declare class Handler {
    handlerFunction: IHandlerFunction;
    constructor(handlerArg: IHandlerFunction);
}
