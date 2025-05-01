/* 3rd party libraries */

/* locally accessible feature module code, always use a relative path */
import { CurrencyValue } from '../types';

export interface LocalizationRef {

  number: ( locale: string, value: number, args?: string ) => string;
  percent: ( locale: string, value: number, args?: string ) => string;
  currency: ( locale: string, value: CurrencyValue, args?: string ) => string;
  money: ( locale: string, value: number, currency?: string, args?: string ) => string;
  datetime: ( locale: string, value: Date | number | string, args?: string ) => string;
}
