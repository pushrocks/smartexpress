/// <reference types="express" />
import { Request, Response } from 'express';
export interface IHandlerFunction {
    (requestArg: Request, responseArg: Response): void;
}
export declare type THttpMethods = 'ALL' | 'GET' | 'POST' | 'PUT' | 'DELETE';
export declare class Handler {
    httpMethod: THttpMethods;
    handlerFunction: IHandlerFunction;
    constructor(httpMethodArg: THttpMethods, handlerArg: IHandlerFunction);
}
