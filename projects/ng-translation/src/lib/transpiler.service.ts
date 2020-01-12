import { Injectable } from '@angular/core';

const INTL_SEP = '|';
const PATTERN_SEP = ':';
const OPTION_SEP = ';';
const VALUE_SEP = '=';
const RANGE_SEP = '-';

@Injectable({
  providedIn: 'root'
})
export class TranspilerService {

  do(
    locale: string,
    text: string,
    re: RegExp,
    value: any
  ): string {

    let localized = value;
    const result = text.match( re );
    if (result && result[ 1 ]) {
      const group = result[ 1 ].trim();
      if (group.startsWith( INTL_SEP )) {

        let format = group.substr( INTL_SEP.length );
        let params = '';
        const pos = format.indexOf( PATTERN_SEP );
        if (pos > 0) {
          params = format.substr( pos + PATTERN_SEP.length );
          format = format.substr( 0, pos );
        }
        format = format.trim();

        switch (format) {
          case 'N':
          case 'number':
            localized = this.numberFormat( locale, params, value );
            break;
          case 'P':
          case 'percent':
            localized = this.percentFormat( locale, params, value );
            break;
          case 'C':
          case 'currency':
            localized = this.currencyFormat( locale, params, value );
            break;
          case 'D':
          case 'datetime':
            localized = this.datetimeFormat( locale, params, value );
            break;
          case 'R':
          case 'plural':
            localized = this.pluralFormat( locale, params, value );
            break;
        }
      }
    }
    return text.replace( result[ 0 ], localized );
  }

  private numberFormat(
    locale: string,
    params: string,
    value: any
  ): string {

    const options = this.extendOptions( { style: 'decimal' }, params );
    return new Intl.NumberFormat( locale, options ).format( value );
  }

  private percentFormat(
    locale: string,
    params: string,
    value: any
  ): string {

    const options = this.extendOptions( { style: 'percent' }, params );
    return new Intl.NumberFormat( locale, options ).format( value );
  }

  private currencyFormat(
    locale: string,
    params: string,
    value: any
  ): string {

    let worth;
    let currency = 'XXX';
    if (Array.isArray( value ) && value.length > 0) {
      worth = value[ 0 ];
      if (value.length > 1) {
        currency = value[ 1 ];
      }
    } else {
      worth = value;
    }
    const options = this.extendOptions( { style: 'currency', currency: currency }, params );
    return new Intl.NumberFormat( locale, options ).format( worth );
  }

  private extendOptions(
    options: object,
    params: string
  ): object {

    const items = params.split( OPTION_SEP );
    items.forEach( item => {
      const parts = item.split( VALUE_SEP );
      if (parts.length === 2) {
        const optionName = parts[ 0 ].trim();
        const optionValue = parts[ 1 ].trim();
        if (optionName === 'useGrouping') {
          options[ optionName ] = optionValue.toLowerCase() !== 'false';
        } else if (optionName === 'currencyDisplay') {
          options[ optionName ] = optionValue;
        } else {
          options[ optionName ] = parseInt( optionValue, 10 );
        }
      }
    } );
    return options;
  }

  private datetimeFormat(
    locale: string,
    params: string,
    value: any
  ): string {

    const options = { };
    const items = params.split( OPTION_SEP );
    items.forEach( item => {
      const parts = item.split( VALUE_SEP );
      if (parts.length === 2) {
        const optionName = parts[ 0 ].trim();
        const optionValue = parts[ 1 ].trim();
        if (optionName === 'hour12') {
          options[ optionName ] = optionValue.toLowerCase() === 'true';
        } else if (optionName === 'fractionalSecondDigits ') {
          options[ optionName ] = parseInt( optionValue, 10 );
        } else {
          options[ optionName ] = optionValue;
        }
      }
    } );
    return new Intl.DateTimeFormat( locale, options ).format( value );
  }

  private pluralFormat(
    locale: string,
    params: string,
    value: number
  ): string {

    const options = new Map();
    const items = params.split( OPTION_SEP );
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
            let from = parseInt( range[ 0 ], 10 );
            let to = parseInt( range[ 1 ], 10 );
            if (!isNaN( from ) || !isNaN( to )) {
              if (isNaN( from) ) { from = to; }
              if (isNaN( to )) { to = from; }
              for (let i = from; i <= to; i++) {
                options.set( i, optionValue );
              }
            }
          } else {
            const i = parseInt( optionName, 10 );
            if (!isNaN( i )) {
              options.set( i, optionValue );
            }
          }
        }
      }
    } );
    const pluralized = options.has( value ) ? options.get( value ) : options.get( 'other' ) || '';
    return pluralized.replace( '#' , value );
  }
}
