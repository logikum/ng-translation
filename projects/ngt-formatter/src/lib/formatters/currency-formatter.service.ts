/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { FormatData, NGT_CONFIGURATION } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { FormatterUtilityService } from './formatter-utility.service';
import { NumberOptionConverterService } from './number-option-converter.service';

@Injectable( {
  providedIn: 'root'
} )
export class CurrencyFormatterService {

  private readonly config = inject( NGT_CONFIGURATION );
  private readonly utility = inject( FormatterUtilityService );
  private readonly converter = inject( NumberOptionConverterService );

  format(
    data: FormatData
  ): string {

    let worth: number;
    let currency = null;

    // Determine the value and the currency code.
    if (Array.isArray( data.value ) && data.value.length > 0) {
      worth = data.value[ 0 ];
      if (data.value.length > 1) {
        currency = data.value[ 1 ];
      }
    } else {
      worth = data.value;
    }
    if (this.utility.missing( worth )) {
      return '';
    }

    // Determine the currency options.
    let options: Intl.NumberFormatOptions = {};

    if (!this.utility.missing( currency ) && currency?.toString().trim() !== '') {
      // Add eventual custom default options.
      if (this.config.currencyDefaultOptions) {
        const cdo = this.config.currencyDefaultOptions[ currency ] ?? '';
        options = this.converter.extendOptions( data.key, cdo, options );
      }
      // Add fix options.
      options = Object.assign( options, {
        style: 'currency',
        currency: currency
      } );
    }
    // Add user options.
    options = this.converter.extendOptions( data.key, data.params, options );

    // Return the formatted currency value as string.
    return new Intl.NumberFormat( data.locale, options ).format( worth );
  }
}
