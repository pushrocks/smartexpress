export type TResponseModifier<T> = (responseArg: T) => Promise<string>;
