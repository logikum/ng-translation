/* 3rd party libraries */
import { Injectable } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { CurrencyValue } from '../types';
import { FormatData } from '../models';
import { MessengerService } from './messenger.service';

const OPTION_SEP = ';';
const VALUE_SEP = '=';

function createFormatData(
  locale: string,
  value: number | CurrencyValue | Date | string,
  args: string
): FormatData {

  return {
    key: undefined,
    locale: locale,
    params: args || '',
    value: value
  };
}

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(
    private readonly messenger: MessengerService
  ) { }

  number(
    locale: string,
    value: number,
    args: string
  ): string {
    return  this.numberFormat( createFormatData( locale, value, args ) );
  }

  numberFormat(
    data: FormatData
  ): string {

    const options: Intl.NumberFormatOptions = this.extendOptions(
      data.key, data.params, { style: 'decimal' }
    );
    return new Intl.NumberFormat( data.locale, options ).format( data.value );
  }

  percent(
    locale: string,
    value: number,
    args: string
  ): string {
    return  this.percentFormat( createFormatData( locale, value, args ) );
  }

  percentFormat(
    data: FormatData
  ): string {

    const options: Intl.NumberFormatOptions = this.extendOptions(
      data.key, data.params, { style: 'percent' }
    );
    return new Intl.NumberFormat( data.locale, options ).format( data.value );
  }

  currency(
    locale: string,
    value: CurrencyValue,
    args: string
  ): string {
    return  this.currencyFormat( createFormatData( locale, value, args ) );
  }

  currencyFormat(
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

  datetime(
    locale: string,
    value: Date | number | string,
    args: string
  ): string {
    return  this.datetimeFormat( createFormatData( locale, value, args ) );
  }

  datetimeFormat(
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
    const value: Date = data.value instanceof Date ? data.value : new Date( data.value );
    return new Intl.DateTimeFormat( data.locale, options ).format( value );
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
