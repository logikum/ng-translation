/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { LocalizationService } from './localization.service';
import { CurrencyValue } from '../types';
import { FormatData } from '../models';

function createFormatData(
  locale: string,
  value: string | number | Date | CurrencyValue,
  args: string
): FormatData {

  return {
    key: undefined,
    locale: locale,
    params: args || '',
    value: value
  };
}

@Injectable( {
  providedIn: 'root'
} )
export class LocalizationRef {

  private readonly localization = inject( LocalizationService );

  number(
    locale: string,
    value: number,
    args: string
  ): string {
    return this.localization.numberFormat( createFormatData( locale, value, args ) );
  }

  percent(
    locale: string,
    value: number,
    args: string
  ): string {
    return this.localization.percentFormat( createFormatData( locale, value, args ) );
  }

  currency(
    locale: string,
    value: CurrencyValue,
    args: string
  ): string {
    return this.localization.currencyFormat( createFormatData( locale, value, args ) );
  }

  ccy(
    locale: string,
    value: number,
    currency: string,
    args?: string
  ): string {
    return this.currency( locale, [ value, currency ], args );
  }

  datetime(
    locale: string,
    value: Date | number | string,
    args: string
  ): string {
    return this.localization.datetimeFormat( createFormatData( locale, value, args ) );
  }
}
