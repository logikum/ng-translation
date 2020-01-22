import { Injectable } from '@angular/core';

const INTL_SEP = '|';
const PATTERN_SEP = ':';
const OPTION_SEP = ';';
const VALUE_SEP = '=';
const RANGE_SEP = '-';
const VALUE_PH = '#';

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
            localized = this.pluralFormat( params, value );
            break;
        }
      }
      return text.replace( result[ 0 ], localized );
    }
    return value ? value.toString() : '';
  }

  private numberFormat(
    locale: string,
    params: string,
    value: any
  ): string {

    const options: Intl.NumberFormatOptions = this.extendOptions(
      { style: 'decimal' },
      params
    );
    return new Intl.NumberFormat( locale, options ).format( value );
  }

  private percentFormat(
    locale: string,
    params: string,
    value: any
  ): string {

    const options: Intl.NumberFormatOptions = this.extendOptions(
      { style: 'percent' },
      params
    );
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
    const options: Intl.NumberFormatOptions = this.extendOptions(
      { style: 'currency', currency: currency },
      params
    );
    return new Intl.NumberFormat( locale, options ).format( worth );
  }

  private extendOptions(
    options: Intl.NumberFormatOptions,
    params: string
  ): Intl.NumberFormatOptions {

    const items = params.split( OPTION_SEP );
    items.forEach( item => {
      const parts = item.split( VALUE_SEP );
      if (parts.length === 2) {
        const optionName = parts[ 0 ].trim();
        const optionValue = parts[ 1 ].trim();
        switch (optionName) {
          case 'cd':
          case 'currencyDisplay':
            options[ 'currencyDisplay' ] = optionValue;
            break;
          case 'minid':
          case 'minimumIntegerDigits':
            options[ 'minimumIntegerDigits' ] = parseInt( optionValue, 10 );
            break;
          case 'minfd':
          case 'minimumFractionDigits':
            options[ 'minimumFractionDigits' ] = parseInt( optionValue, 10 );
            break;
          case 'maxfd':
          case 'maximumFractionDigits':
            options[ 'maximumFractionDigits' ] = parseInt( optionValue, 10 );
            break;
          case 'minsd':
          case 'minimumSignificantDigits':
            options[ 'minimumSignificantDigits' ] = parseInt( optionValue, 10 );
            break;
          case 'maxsd':
          case 'maximumSignificantDigits':
            options[ 'maximumSignificantDigits' ] = parseInt( optionValue, 10 );
            break;
          case 'ug':
          case 'useGrouping':
            options[ 'useGrouping' ] = optionValue.toLowerCase() !== 'false';
            break;
          case 'lm':
          case 'localeMatcher':
            options[ 'localeMatcher' ] = optionValue;
            break;
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

    const options: Intl.DateTimeFormatOptions = { };
    const items = params.split( OPTION_SEP );
    items.forEach( item => {
      const parts = item.split( VALUE_SEP );
      if (parts.length === 2) {
        const optionName = parts[ 0 ].trim();
        const optionValue = parts[ 1 ].trim();
        switch (optionName) {
          case 'wd':
          case 'weekday':
            options[ 'weekday' ] = optionValue;
            break;
          case 'era':
            options[ 'era' ] = optionValue;
            break;
          case 'y':
          case 'year':
            options[ 'year' ] = optionValue;
            break;
          case 'M':
          case 'month':
            options[ 'month' ] = optionValue;
            break;
          case 'd':
          case 'day':
            options[ 'day' ] = optionValue;
            break;
          case 'h':
          case 'hour':
            options[ 'hour' ] = optionValue;
            break;
          case 'h12':
          case 'hour12':
            options[ 'hour12' ] = optionValue.toLowerCase() === 'true';
            break;
          case 'm':
          case 'minute':
            options[ 'minute' ] = optionValue;
            break;
          case 's':
          case 'second':
            options[ 'second' ] = optionValue;
            break;
          case 'tz':
          case 'timeZone':
            options[ 'timeZone' ] = optionValue;
            break;
          case 'tzn':
          case 'timeZoneName':
            options[ 'timeZoneName' ] = optionValue;
            break;
          case 'lm':
          case 'localeMatcher':
            options[ 'localeMatcher' ] = optionValue;
            break;
          case 'fm':
          case 'formatMatcher':
            options[ 'formatMatcher' ] = optionValue;
            break;
        }
      }
    } );
    return new Intl.DateTimeFormat( locale, options ).format( value );
  }

  private pluralFormat(
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
    return pluralized.replace( VALUE_PH , value );
  }
}
