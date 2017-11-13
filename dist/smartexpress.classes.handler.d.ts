export interface IHandlerFunction {
    (requestArg: any, responseArg: any): void;
}
export declare class Handler {
    handlerFunction: IHandlerFunction;
    constructor(handlerArg: IHandlerFunction);
}
