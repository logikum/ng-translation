/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { FormatData } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { FormatterUtilityService } from './formatter-utility.service';
import { NumberOptionConverterService } from './number-option-converter.service';

@Injectable( {
  providedIn: 'root'
} )
export class NumberFormatterService {

  private readonly utility = inject( FormatterUtilityService );
  private readonly converter = inject( NumberOptionConverterService );

  format(
    data: FormatData
  ): string {

    if (this.utility.missing( data.value )) {
      return '';
    }
    const options: Intl.NumberFormatOptions = this.converter.extendOptions(
      data.key, data.params, { style: 'decimal' }
    );
    return new Intl.NumberFormat( data.locale, options ).format( data.value );
  }
}
