/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { MessengerService } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { FormatterUtilityService } from './formatter-utility.service';
import { OPTION_SEP, VALUE_SEP } from './format-constants';

@Injectable( {
  providedIn: 'root'
} )
export class NumberOptionConverterService {

  private readonly messenger = inject( MessengerService );
  private readonly utility = inject( FormatterUtilityService );

  extendOptions(
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
            options.currencyDisplay = this.utility.checkMember(
              key, optionValue, [ 'symbol', 'code', 'name' ]
            ) as keyof Intl.NumberFormatOptionsCurrencyDisplayRegistry;
            break;
          case 'minid':
          case 'minimumIntegerDigits':
            options.minimumIntegerDigits = this.utility.getInt( key, optionValue );
            break;
          case 'minfd':
          case 'minimumFractionDigits':
            options.minimumFractionDigits = this.utility.getInt( key, optionValue );
            break;
          case 'maxfd':
          case 'maximumFractionDigits':
            options.maximumFractionDigits = this.utility.getInt( key, optionValue );
            break;
          case 'minsd':
          case 'minimumSignificantDigits':
            options.minimumSignificantDigits = this.utility.getInt( key, optionValue );
            break;
          case 'maxsd':
          case 'maximumSignificantDigits':
            options.maximumSignificantDigits = this.utility.getInt( key, optionValue );
            break;
          case 'ug':
          case 'useGrouping':
            options.useGrouping = optionValue.toLowerCase() !== 'false';
            break;
          case 'lm':
          case 'localeMatcher':
            options.localeMatcher = this.utility.checkMember(
              key, optionValue, [ 'lookup', 'best fit' ]
            ) as 'lookup' | 'best fit';
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
}
