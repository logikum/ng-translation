/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { FormatData, FormatExtender, TranspileData } from '../models';
import { MessengerService } from './messenger.service';
import {
  CurrencyFormatterService,
  DatetimeFormatterService,
  NumberFormatterService,
  PercentFormatterService
} from '../formatters';
import {
  INTL_SEP, PATTERN_SEP, OPTION_SEP, VALUE_SEP, RANGE_SEP, VALUE_PH
} from '../formatters/format-constants';

@Injectable( {
  providedIn: 'root'
} )
export class InterpolationService {

  private readonly currencyFormatter = inject( CurrencyFormatterService );
  private readonly datetimeFormatter = inject( DatetimeFormatterService );
  private readonly numberFormatter = inject( NumberFormatterService );
  private readonly percentFormatter = inject( PercentFormatterService );
  private readonly messenger = inject( MessengerService );

  extender: FormatExtender;

  insert(
    data: TranspileData,
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
    tdata: TranspileData,
    re: RegExp,
    value: any
  ): string {

    let localized = (value === undefined || value === null) ? '' : value.toString();
    const result = RegExp( re ).exec( tdata.text );
    if (result && result[ 1 ]) {
      const group = result[ 1 ].trim();
      if (group.startsWith( INTL_SEP )) {

        let format = group.substring( INTL_SEP.length );
        let params = '';
        const pos = format.indexOf( PATTERN_SEP );
        if (pos > 0) {
          params = format.substring( pos + PATTERN_SEP.length );
          format = format.substring( 0, pos );
        }
        format = format.trim();
        const fdata: FormatData = {
          key: tdata.key,
          locale: tdata.locale,
          params: params,
          value: value
        };
        let transpiled: string;
        switch (format) {
          case 'N':
          case 'number':
            localized = this.numberFormatter.format( fdata );
            break;
          case 'P':
          case 'percent':
            localized = this.percentFormatter.format( fdata );
            break;
          case 'C':
          case 'currency':
            localized = this.currencyFormatter.format( fdata );
            break;
          case 'D':
          case 'datetime':
            localized = this.datetimeFormatter.format( fdata );
            break;
          case 'R':
          case 'plural':
            localized = this.pluralFormat( fdata );
            break;
          default:
            transpiled = this.extender.transpile( format, fdata );
            if (transpiled !== undefined) {
              localized = transpiled;
            } else {
              this.messenger.formatError( tdata.key, format );
            }
            break;
        }
      }
    }
    return result ? tdata.text.replace( result[ 0 ], localized ) : tdata.text;
  }

  private pluralFormat(
    data: FormatData
  ): string {

    if (data.value === null || data.value === undefined) {
      return '';
    }
    const options = new Map();
    const items = data.params.split( OPTION_SEP );

    items.forEach( item => {
      const parts = item.split( VALUE_SEP );
      if (parts.length === 2) {
        const optionName = parts[ 0 ].trim();
        const optionValue = parts[ 1 ].trim();

        if (optionName === 'other') {
          options.set( optionName, optionValue );
        } else {
          const pos = optionName.indexOf( RANGE_SEP );
          if (pos > 0) {
            const range = optionName.split( RANGE_SEP );
            const from = parseInt( range[ 0 ], 10 );
            const to = parseInt( range[ 1 ], 10 );
            if (isNaN( from ) || isNaN( to )) {
              this.messenger.pluralError( data.key, optionName );
            } else if (from > to) {
              for (let i = to; i <= from; i++) {
                options.set( i, optionValue );
              }
            } else {
              for (let i = from; i <= to; i++) {
                options.set( i, optionValue );
              }
            }
          } else {
            const i = parseInt( optionName, 10 );
            if (isNaN( i )) {
              this.messenger.pluralError( data.key, optionName );
            } else {
              options.set( i, optionValue );
            }
          }
        }
      } else if (parts.length > 2) {
        this.messenger.optionValueError( data.key, item );
      }
    } );
    const pluralized = options.has( data.value )
      ? options.get( data.value )
      : options.get( 'other' ) ?? '';
    const value = this.numberFormatter.format( {
      key: undefined,
      locale: data.locale,
      params: '',
      value: data.value
    } );
    return pluralized.replace( VALUE_PH, value );
  }
}
