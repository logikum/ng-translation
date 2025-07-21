/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import {
  CurrencyValue, DateValue, FormatterService, LocalizationRef, NGT_CONFIGURATION,
  FormatData, FormatExtender, InterpolationData, MessengerService
} from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import {
  CurrencyFormatterService,
  DatetimeFormatterService,
  NumberFormatterService,
  PercentFormatterService,
  PluralFormatterService
} from './formatters';
import { INTL_SEP, PATTERN_SEP } from './formatters/format-constants';

@Injectable( {
  providedIn: 'root'
} )
export class NgtFormatterService implements FormatterService {

  private readonly config = inject( NGT_CONFIGURATION );
  private readonly currencyFormatter = inject( CurrencyFormatterService );
  private readonly datetimeFormatter = inject( DatetimeFormatterService );
  private readonly numberFormatter = inject( NumberFormatterService );
  private readonly percentFormatter = inject( PercentFormatterService );
  private readonly pluralFormatter = inject( PluralFormatterService );
  private readonly messenger = inject( MessengerService );

  extender: FormatExtender;

  get name() { return  'NgT Formatter Service'; }

  insert(
    data: InterpolationData,
    args?: any
  ): string {

    if (data.text && typeof data.text === 'string') {
      if (args === null || args === undefined ||
        typeof args === 'string' || typeof args === 'number' ||
        typeof args === 'boolean' || args instanceof Date
      ) {
        args = [ args ];
      }
      if (args instanceof Array) {

        // Check currency data type.
        if (args.length === 2 &&
          typeof args[ 0 ] === 'number' &&
          typeof args[ 1 ] === 'string' && args[ 1 ].length === 3
        ) {
          args = [ args ];
        }

        // Replace indexed parameters: 'xxxxxx{{0}}xxxxxxxx{{1}}xxxxxx'
        let index = 0;
        args.forEach( arg => {
          const re = new RegExp( `\\{\\{\\s*${ index++ }\\s*([^}]+)?}}` );
          if (re) {
            data.text = this.replace( data, re, arg );
          }
        } );
      } else if (typeof args === 'object') {

        // Replace named parameters: 'xxxxxx{{name-A}}xxxxxxxx{{name-B}}xxxxxx'
        const names = Object.getOwnPropertyNames( args );
        names.forEach( name => {
          const re = new RegExp( `\\{\\{\\s*${ name }\\s*([^}]+)?}}` );
          if (re) {
            data.text = this.replace( data, re, args[ name ] );
          }
        } );
      } else {
        this.messenger.warn( `[${ data.key }] Not supported argument type: ${ typeof args }` );
      }
    }
    return data.text;
  }

  private replace(
    data: InterpolationData,
    re: RegExp,
    value: any
  ): string {

    let localized: string;
    const result = RegExp( re ).exec( data.text );
    if (result?.[ 1 ]) {
      const group = result[ 1 ].trim();
      if (group.startsWith( INTL_SEP )) {

        let params = '';
        let format = group.substring( INTL_SEP.length );
        const pos = format.indexOf( PATTERN_SEP );
        if (pos > 0) {
          params = format.substring( pos + PATTERN_SEP.length );
          format = format.substring( 0, pos );
        }
        localized = this.getLocalizedValue( format.trim(), {
          key: data.key,
          locale: data.locale,
          params: params,
          value: value
        } );
      }
    }
    localized ??= (value ?? '').toString();
    return result ? data.text.replace( result[ 0 ], localized ) : data.text;
  }

  private getLocalizedValue(
    format: string,
    formatData: FormatData
  ): string {

    let interpolated: string;
    switch (format) {
      case 'N':
      case 'number':
        return this.numberFormatter.format( formatData );
      case 'P':
      case 'percent':
        return this.percentFormatter.format( formatData );
      case 'C':
      case 'currency':
        return this.currencyFormatter.format( formatData );
      case 'D':
      case 'datetime':
        return this.datetimeFormatter.format( formatData );
      case 'R':
      case 'plural':
        return this.pluralFormatter.format( formatData );
      default:
        interpolated = this.extender.interpolate( format, formatData );
        if (interpolated !== undefined) {
          return interpolated;
        } else {
          this.messenger.formatError( formatData.key, format );
          return undefined;
        }
    }
  }

  getLocalizationRef(): LocalizationRef {

    return {
      number: (
        locale: string,
        value: number,
        args?: string
      ): string => {

        return this.numberFormatter.format(
          this.createFormatData( locale, value, args )
        );
      },
      percent: (
        locale: string,
        value: number,
        args?: string
      ): string => {

        return this.percentFormatter.format(
          this.createFormatData( locale, value, args )
        );
      },
      currency: (
        locale: string,
        value: CurrencyValue,
        args?: string
      ): string => {

        return this.currencyFormatter.format(
          this.createFormatData( locale, value, args )
        );
      },
      money: (
        locale: string,
        value: number,
        currency?: string,
        args?: string
      ): string => {

        let vCurrency = currency || this.config.defaultCurrency;
        let vArgs = args;
        if (currency && (currency.length !== 3 ||
          [...currency].some( c => c !== c.toUpperCase() ))
        ) {
          vCurrency = this.config.defaultCurrency;
          if (!args) {
            vArgs = currency;
          }
        }
        return this.currencyFormatter.format(
          this.createFormatData( locale, [value, vCurrency], vArgs )
        );
      },
      datetime: (
        locale: string,
        value: DateValue,
        args?: string
      ): string => {

        return this.datetimeFormatter.format(
          this.createFormatData( locale, value, args )
        );
      },
      date: (
        locale: string,
        value: DateValue,
        args?: string
      ): string => {
        throw new Error( 'Method date() is not implemented in NgT Formatter Service.' );
      },
      time: (
        locale: string,
        value: DateValue,
        args?: string
      ): string => {
        throw new Error( 'Method time() is not implemented in NgT Formatter Service.' );
      }
    };
  }

  private createFormatData(
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
}
