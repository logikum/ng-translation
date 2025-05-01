/* 3rd party libraries */

/* locally accessible feature module code, always use a relative path */

export type TextListKeys = string | Array<string> | object;

export interface HashMap<T = any> { [key: string]: T; }
export type InlineLoaderMap = HashMap<( lang: string, name: string ) => Promise<object>>;
