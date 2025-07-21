/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { FormatData } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { FormatterUtilityService } from './formatter-utility.service';
import { DatetimeOptionConverterService } from './datetime-option-converter.service';

@Injectable( {
  providedIn: 'root'
} )
export class DatetimeFormatterService {

  private readonly utility = inject( FormatterUtilityService );
  private readonly converter = inject( DatetimeOptionConverterService );

  format(
    data: FormatData
  ): string {

    if (this.utility.missing( data.value )) {
      return '';
    }
    const options: Intl.DateTimeFormatOptions = this.converter.extendOptions(
      data.key, data.params, {}
    );
    const value: Date = data.value instanceof Date
      ? data.value
      : new Date( data.value )
    ;
    return new Intl.DateTimeFormat( data.locale, options ).format( value );
  }
}
