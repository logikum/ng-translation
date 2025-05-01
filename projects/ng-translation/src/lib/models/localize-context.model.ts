/* 3rd party libraries */
import { CurrencyValue } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */

export interface LocalizeContext {

  number( value: number, args?: string ): string;
  percent( value: number, args?: string ): string;
  currency( value: CurrencyValue, args?: string ): string;
  money( value: number, currency: string, args?: string ): string;
  datetime( value: Date | number | string, args?: string ): string;
}
