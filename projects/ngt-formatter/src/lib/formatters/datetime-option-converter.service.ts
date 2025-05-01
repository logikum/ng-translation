/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { MessengerService } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { FormatterUtilityService } from './formatter-utility.service';
import { OPTION_SEP, VALUE_SEP } from './format-constants';

@Injectable( {
  providedIn: 'root'
} )
export class DatetimeOptionConverterService {

  private readonly messenger = inject( MessengerService );
  private readonly utility = inject( FormatterUtilityService );

  extendOptions(
    key: string,
    params: string,
    options: Intl.DateTimeFormatOptions
  ): Intl.DateTimeFormatOptions {

    if (params.trim().length === 0) {
      return options;
    }
    const items = params.split( OPTION_SEP );

    items.forEach( item => {
      const parts = item.split( VALUE_SEP );
      if (parts.length === 2) {

        const optionName = parts[ 0 ].trim();
        const optionValue = parts[ 1 ].trim();
        let fsdValue: number;

        switch (optionName) {
          case 'ds':
          case 'dateStyle':
            this.setDateStyle( key, options, optionValue );
            break;
          case 'ts':
          case 'timeStyle':
            this.setTimeStyle( key, options, optionValue );
            break;
          case 'wd':
          case 'weekday':
            options.weekday = this.utility.checkMember(
              key, optionValue, [ 'long', 'short', 'narrow' ]
            ) as 'long' | 'short' | 'narrow';
            break;
          case 'era':
            options.era = this.utility.checkMember(
              key, optionValue, [ 'long', 'short', 'narrow' ]
            ) as 'long' | 'short' | 'narrow';
            break;
          case 'y':
          case 'year':
            options.year = this.utility.checkMember(
              key, optionValue, [ 'numeric', '2-digit' ]
            ) as 'numeric' | '2-digit';
            break;
          case 'M':
          case 'month':
            options.month = this.utility.checkMember(
              key, optionValue, [ 'numeric', '2-digit', 'long', 'short', 'narrow' ]
            ) as 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
            break;
          case 'd':
          case 'day':
            options.day = this.utility.checkMember(
              key, optionValue, [ 'numeric', '2-digit' ]
            ) as 'numeric' | '2-digit';
            break;
          case 'h':
          case 'hour':
            options.hour = this.utility.checkMember(
              key, optionValue, [ 'numeric', '2-digit' ]
            ) as 'numeric' | '2-digit';
            break;
          case 'm':
          case 'minute':
            options.minute = this.utility.checkMember(
              key, optionValue, [ 'numeric', '2-digit' ]
            ) as 'numeric' | '2-digit';
            break;
          case 's':
          case 'second':
            options.second = this.utility.checkMember(
              key, optionValue, [ 'numeric', '2-digit' ]
            ) as 'numeric' | '2-digit';
            break;
          case 'fsd':
          case 'fractionalSecondDigits':
            fsdValue = parseInt( optionValue, 10 );
            if (isNaN( fsdValue ) || ![ 1, 2, 3 ].includes( fsdValue )) {
              this.messenger.optionValueError( key, optionValue );
              fsdValue = undefined;
            }
            options.fractionalSecondDigits = fsdValue as 1 | 2 | 3 | undefined;
            break;
          case 'tz':
          case 'timeZone':
            options.timeZone = optionValue;
            break;
          case 'tzn':
          case 'timeZoneName':
            options.timeZoneName = this.utility.checkMember(
              key, optionValue, [ 'long', 'short' ]
            ) as 'long' | 'short';
            break;
          case 'h12':
          case 'hour12':
            options.hour12 = optionValue.toLowerCase() === 'true';
            break;
          case 'lm':
          case 'localeMatcher':
            options.localeMatcher = this.utility.checkMember(
              key, optionValue, [ 'lookup', 'best fit' ]
            ) as 'lookup' | 'best fit';
            break;
          case 'fm':
          case 'formatMatcher':
            options.formatMatcher = this.utility.checkMember(
              key, optionValue, [ 'basic', 'best fit' ]
            ) as 'basic' | 'best fit';
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

  private setDateStyle(
    key: string,
    options: Intl.DateTimeFormatOptions,
    optionValue: string
  ): void {

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
  }

  private setTimeStyle(
    key: string,
    options: Intl.DateTimeFormatOptions,
    optionValue: string
  ): void {

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
  }
}
