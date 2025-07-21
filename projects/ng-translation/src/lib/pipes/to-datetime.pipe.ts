/* 3rd party libraries */
import { Pipe, PipeTransform } from '@angular/core';
import { DateValue } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toDatetime',
  pure: false,
  standalone: false
} )
export class ToDatetimePipe extends TranslationPipeBase implements PipeTransform {

  transform(
    value: DateValue,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localizer.datetime(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
