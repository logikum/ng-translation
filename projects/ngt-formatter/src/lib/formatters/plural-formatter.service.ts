/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { FormatData, MessengerService } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { OPTION_SEP, RANGE_SEP, VALUE_PH, VALUE_SEP } from './format-constants';
import { NumberFormatterService } from './number-formatter.service';

@Injectable( {
  providedIn: 'root'
} )
export class PluralFormatterService {

  private readonly messenger = inject( MessengerService );
  private readonly numberFormatter = inject( NumberFormatterService );

  format(
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
