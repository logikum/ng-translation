/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { CurrencyValue } from '../types';

export interface LocalizeContext {

  number( value: number, args?: string ): string;
  percent( value: number, args?: string ): string;
  currency( value: CurrencyValue, args?: string ): string;
  datetime( value: Date | number | string, args?: string ): string;
}
