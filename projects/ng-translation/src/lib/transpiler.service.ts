import { Injectable } from '@angular/core';
import { MessengerService } from './messenger.service';

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

  constructor(
    private messenger: MessengerService
  ) { }

  insert(
    key: string,
    locale: string,
    text: string,
    args?: any
  ): string {

    if (text && args !== undefined) {
      if (args === null) {
        args = 'null';
      }
      if (typeof args === 'string' || typeof args === 'number' || typeof args === 'boolean') {
        args = [ args ];
      }
      if (args instanceof Array) {

        // Replace indexed parameters: 'xxxxxx{{0}}xxxxxxxx{{1}}xxxxxx'
        let index = 0;
        args.forEach( arg => {
          const re = new RegExp( `\\{\\{\\s*${ index++ }([^\}]+)?\\}\\}` );
          if (re) {
            text = this.replace( key, locale, text, re, arg );
          }
        } );
      } else if (typeof args === 'object') {

        // Replace named parameters: 'xxxxxx{{name-A}}xxxxxxxx{{name-B}}xxxxxx'
        const names = Object.getOwnPropertyNames( args );
        names.forEach( name => {
          const re = new RegExp( `\\{\\{\\s*${ name }([^\}]+)?\\}\\}` );
          if (re) {
            text = this.replace( key, locale, text, re, args[ name ] );
          }
        } );
      } else {
        this.messenger.warn( `[${ key }] Not supported argument type: ${ typeof args }` );
      }
    }
    return text;
  }

  private replace(
    key: string,
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
            localized = this.numberFormat( key, locale, params, value );
            break;
          case 'P':
          case 'percent':
            localized = this.percentFormat( key, locale, params, value );
            break;
          case 'C':
          case 'currency':
            localized = this.currencyFormat( key, locale, params, value );
            break;
          case 'D':
          case 'datetime':
            localized = this.datetimeFormat( key, locale, params, value );
            break;
          case 'R':
          case 'plural':
            localized = this.pluralFormat( key, params, value );
            break;
          default:
            this.messenger.formatError( key, format );
            break;
        }
      }
      return text.replace( result[ 0 ], localized );
    }
    return value ? value.toString() : '';
  }

  private numberFormat(
    key: string,
    locale: string,
    params: string,
    value: any
  ): string {

    const options: Intl.NumberFormatOptions = this.extendOptions(
      key, { style: 'decimal' }, params
    );
    return new Intl.NumberFormat( locale, options ).format( value );
  }

  private percentFormat(
    key: string,
    locale: string,
    params: string,
    value: any
  ): string {

    const options: Intl.NumberFormatOptions = this.extendOptions(
      key, { style: 'percent' }, params
    );
    return new Intl.NumberFormat( locale, options ).format( value );
  }

  private currencyFormat(
    key: string,
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
      key, { style: 'currency', currency: currency }, params
    );
    return new Intl.NumberFormat( locale, options ).format( worth );
  }

  private extendOptions(
    key: string,
    options: Intl.NumberFormatOptions,
    params: string
  ): Intl.NumberFormatOptions {

    if (params.trim().length === 0) {
      return options;
    }
    const items = params.split( OPTION_SEP );
    items.forEach( item => {
      const parts = item.split( VALUE_SEP );
      if (parts.length === 2) {
        const optionName = parts[ 0 ].trim();
        const optionValue = parts[ 1 ].trim();
        switch (optionName) {
          case 'cd':
          case 'currencyDisplay':
            options.currencyDisplay = optionValue;
            break;
          case 'minid':
          case 'minimumIntegerDigits':
            options.minimumIntegerDigits = this.getInt( key, optionValue );
            break;
          case 'minfd':
          case 'minimumFractionDigits':
            // options.minimumFractionDigits = parseInt( optionValue, 10 );
            options.minimumFractionDigits = this.getInt( key, optionValue );
            break;
          case 'maxfd':
          case 'maximumFractionDigits':
            options.maximumFractionDigits = this.getInt( key, optionValue );
            break;
          case 'minsd':
          case 'minimumSignificantDigits':
            options.minimumSignificantDigits = this.getInt( key, optionValue );
            break;
          case 'maxsd':
          case 'maximumSignificantDigits':
            options.maximumSignificantDigits = this.getInt( key, optionValue );
            break;
          case 'ug':
          case 'useGrouping':
            options.useGrouping = optionValue.toLowerCase() !== 'false';
            break;
          case 'lm':
          case 'localeMatcher':
            options.localeMatcher = optionValue;
            break;
          default:
            this.messenger.optionNameError( key, optionName );
            break;
        }
      } else if (parts.length > 2) {
        this.messenger.optionValueError( key, parts.length === 1 ? '' : item );
      }
    } );
    return options;
  }

  private datetimeFormat(
    key: string,
    locale: string,
    params: string,
    value: any
  ): string {

    const options: Intl.DateTimeFormatOptions = { };
    if (params.trim().length > 0) {
      const items = params.split( OPTION_SEP );
      items.forEach( item => {
        const parts = item.split( VALUE_SEP );
        if (parts.length === 2) {
          const optionName = parts[ 0 ].trim();
          const optionValue = parts[ 1 ].trim();
          switch (optionName) {
            case 'ds':
            case 'dateStyle':
              switch (optionValue) {
                case 'short':
                  options.year = 'numeric';
                  options.month = '2-digit';
                  options.day = '2-digit';
                  break;
                case 'medium':
                  options.year = 'numeric';
                  options.month = 'short';
                  options.day = 'numeric';
                  break;
                case 'long':
                  options.year = 'numeric';
                  options.month = 'long';
                  options.day = 'numeric';
                  break;
                case 'full':
                  options.year = 'numeric';
                  options.month = 'long';
                  options.day = 'numeric';
                  options.weekday = 'long';
                  break;
                default:
                  this.messenger.dateStyleError( key, optionValue );
                  break;
              }
              break;
            case 'ts':
            case 'timeStyle':
              switch (optionValue) {
                case 'short':
                  options.hour = 'numeric';
                  options.minute = '2-digit';
                  break;
                case 'medium':
                  options.hour = 'numeric';
                  options.minute = '2-digit';
                  options.second = '2-digit';
                  break;
                case 'long':
                  options.hour = 'numeric';
                  options.minute = '2-digit';
                  options.second = '2-digit';
                  options.timeZoneName = 'short';
                  break;
                case 'full':
                  options.hour = 'numeric';
                  options.minute = '2-digit';
                  options.second = '2-digit';
                  options.timeZoneName = 'long';
                  break;
                default:
                  this.messenger.timeStyleError( key, optionValue );
                  break;
              }
              break;
            case 'wd':
            case 'weekday':
              options.weekday = optionValue;
              break;
            case 'era':
              options.era = optionValue;
              break;
            case 'y':
            case 'year':
              options.year = optionValue;
              break;
            case 'M':
            case 'month':
              options.month = optionValue;
              break;
            case 'd':
            case 'day':
              options.day = optionValue;
              break;
            case 'h':
            case 'hour':
              options.hour = optionValue;
              break;
            case 'h12':
            case 'hour12':
              options.hour12 = optionValue.toLowerCase() === 'true';
              break;
            case 'm':
            case 'minute':
              options.minute = optionValue;
              break;
            case 's':
            case 'second':
              options[ 'second' ] = optionValue;
              break;
            case 'tz':
            case 'timeZone':
              options.timeZone = optionValue;
              break;
            case 'tzn':
            case 'timeZoneName':
              options.timeZoneName = optionValue;
              break;
            case 'lm':
            case 'localeMatcher':
              options.localeMatcher = optionValue;
              break;
            case 'fm':
            case 'formatMatcher':
              options.formatMatcher = optionValue;
              break;
            default:
              this.messenger.optionNameError( key, optionName );
              break;
          }
        } else if (parts.length > 2) {
          this.messenger.optionValueError( key, parts.length === 1 ? '' : item );
        }
      } );
    }
    return new Intl.DateTimeFormat( locale, options ).format( value );
  }

  private pluralFormat(
    key: string,
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
            const from = parseInt( range[ 0 ], 10 );
            const to = parseInt( range[ 1 ], 10 );
            if (isNaN( from ) || isNaN( to )) {
              this.messenger.warn( `[${ key }] Option must be a number, a range or "other": ${ optionName }` );
            } else {
              if (from > to) {
                for (let i = to; i <= from; i++) {
                  options.set( i, optionValue );
                }
              } else {
                for (let i = from; i <= to; i++) {
                  options.set( i, optionValue );
                }
              }
            }
          } else {
            const i = parseInt( optionName, 10 );
            if (isNaN( i )) {
              this.messenger.warn( `[${ key }] Option must be a number, a range or "other": ${ optionName }` );
            } else {
              options.set( i, optionValue );
            }
          }
        }
      } else if (parts.length > 2) {
        this.messenger.warn( `[${ key }] Missing or invalid option value: ${ item }` );
      }
    } );
    const pluralized = options.has( value ) ? options.get( value ) : options.get( 'other' ) || '';
    return pluralized.replace( VALUE_PH , value );
  }

  private getInt(
    key: string,
    optionValue: string
  ): number {

    const num = parseInt( optionValue, 10 );
    if (isNaN(num)) {
      this.messenger.optionValueError( key, optionValue );
      return undefined;
    }
    return num;
  }
}
