/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */

export type CurrencyValue = [ number, string ];
export type LoaderType = 'json' | 'text' | 'blob' | 'arraybuffer' | 'inline';
export type TextListKeys = string | Array<string> | object;

export type HashMap<T = any> = { [key: string]: T };
export type InlineLoaderMap = HashMap<( lang: string, name: string ) => Promise<object>>;
