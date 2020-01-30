import { Inject, Injectable } from '@angular/core';

import { FormatData, NGT_TRANSPILER, TranspileData, TranspileExtender } from '../models';
import { MessengerService } from './messenger.service';

const INTL_SEP = '|';
const PATTERN_SEP = ':';
const OPTION_SEP = ';';
const VALUE_SEP = '=';
const RANGE_SEP = '~';
const VALUE_PH = '#';

@Injectable({
  providedIn: 'root'
})
export class TranspilerService {

  extender: TranspileExtender;

  constructor(
    private readonly messenger: MessengerService
  ) { }

  insert(
    data: TranspileData,
    args?: any
  ): string {

    if (data.text && args !== undefined) {
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
          const re = new RegExp( `\\{\\{\\s*${ index++ }\\s*([^\}]+)?\\}\\}` );
          if (re) {
            data.text = this.replace( data, re, arg );
          }
        } );
      } else if (typeof args === 'object') {

        // Replace named parameters: 'xxxxxx{{name-A}}xxxxxxxx{{name-B}}xxxxxx'
        const names = Object.getOwnPropertyNames( args );
        names.forEach( name => {
          const re = new RegExp( `\\{\\{\\s*${ name }\\s*([^\}]+)?\\}\\}` );
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

    let localized = value ? value.toString() : '';
    const result = tdata.text.match( re );
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
        const fdata: FormatData = {
          key: tdata.key,
          locale: tdata.locale,
          params: params,
          value: value
        };
        switch (format) {
          case 'N':
          case 'number':
            localized = this.numberFormat( fdata );
            break;
          case 'P':
          case 'percent':
            localized = this.percentFormat( fdata );
            break;
          case 'C':
          case 'currency':
            localized = this.currencyFormat( fdata );
            break;
          case 'D':
          case 'datetime':
            localized = this.datetimeFormat( fdata );
            break;
          case 'R':
          case 'plural':
            localized = this.pluralFormat( fdata );
            break;
          default:
            const transpiled = this.extender.transpile( format, fdata );
            if (transpiled) {
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

  private numberFormat(
    data: FormatData
  ): string {

    const options: Intl.NumberFormatOptions = this.extendOptions(
      data.key, data.params, { style: 'decimal' }
    );
    return new Intl.NumberFormat( data.locale, options ).format( data.value );
  }

  private percentFormat(
    data: FormatData
  ): string {

    const options: Intl.NumberFormatOptions = this.extendOptions(
      data.key, data.params, { style: 'percent' }
    );
    return new Intl.NumberFormat( data.locale, options ).format( data.value );
  }

  private currencyFormat(
    data: FormatData
  ): string {

    let worth;
    let currency = 'XXX';

    if (Array.isArray( data.value ) && data.value.length > 0) {
      worth = data.value[ 0 ];
      if (data.value.length > 1) {
        currency = data.value[ 1 ];
      }
    } else {
      worth = data.value;
    }
    const options: Intl.NumberFormatOptions = this.extendOptions(
      data.key, data.params, { style: 'currency', currency: currency }
    );
    return new Intl.NumberFormat( data.locale, options ).format( worth );
  }

  private extendOptions(
    key: string,
    params: string,
    options: Intl.NumberFormatOptions
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
            options.currencyDisplay = this.checkMember( key, optionValue,
              ['symbol', 'code', 'name'] );
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
            options.localeMatcher = this.checkMember( key, optionValue,
              ['lookup', 'best fit'] );
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
    data: FormatData
  ): string {

    const options: Intl.DateTimeFormatOptions = { };
    if (data.params.trim().length > 0) {
      const items = data.params.split( OPTION_SEP );
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
                  this.messenger.dateStyleError( data.key, optionValue );
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
                  this.messenger.timeStyleError( data.key, optionValue );
                  break;
              }
              break;
            case 'wd':
            case 'weekday':
              options.weekday = this.checkMember( data.key, optionValue,
                ['long', 'short', 'narrow'] );
              break;
            case 'era':
              options.era = this.checkMember( data.key, optionValue,
                ['long', 'short', 'narrow'] );
              break;
            case 'y':
            case 'year':
              options.year = this.checkMember( data.key, optionValue,
                ['numeric', '2-digit'] );
              break;
            case 'M':
            case 'month':
              options.month = this.checkMember( data.key, optionValue,
                ['numeric', '2-digit', 'long', 'short', 'narrow'] );
              break;
            case 'd':
            case 'day':
              options.day = this.checkMember( data.key, optionValue,
                ['numeric', '2-digit'] );
              break;
            case 'h':
            case 'hour':
              options.hour = this.checkMember( data.key, optionValue,
                ['numeric', '2-digit'] );
              break;
            case 'm':
            case 'minute':
              options.minute = this.checkMember( data.key, optionValue,
                ['numeric', '2-digit'] );
              break;
            case 's':
            case 'second':
              options.second = this.checkMember( data.key, optionValue,
                ['numeric', '2-digit'] );
              break;
            case 'tz':
            case 'timeZone':
              options.timeZone = optionValue;
              break;
            case 'tzn':
            case 'timeZoneName':
              options.timeZoneName = this.checkMember( data.key, optionValue,
                ['long', 'short'] );
              break;
            case 'h12':
            case 'hour12':
              options.hour12 = optionValue.toLowerCase() === 'true';
              break;
            case 'lm':
            case 'localeMatcher':
              options.localeMatcher = this.checkMember( data.key, optionValue,
                ['lookup', 'best fit'] );
              break;
            case 'fm':
            case 'formatMatcher':
              options.formatMatcher = this.checkMember( data.key, optionValue,
                ['basic', 'best fit'] );
              break;
            default:
              this.messenger.optionNameError( data.key, optionName );
              break;
          }
        } else if (parts.length > 2) {
          this.messenger.optionValueError( data.key, parts.length === 1 ? '' : item );
        }
      } );
    }
    return new Intl.DateTimeFormat( data.locale, options ).format( data.value );
  }

  private pluralFormat(
    data: FormatData
  ): string {

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
    const pluralized = options.has( data.value ) ? options.get( data.value ) : options.get( 'other' ) || '';
    return pluralized.replace( VALUE_PH , data.value );
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

  private checkMember(
    key: string,
    member: string,
    list: Array<string>
  ): string {

    if (list.indexOf( member ) < 0) {
      this.messenger.optionValueError( key, member );
      return undefined;
    }
    return member;
  }
}
