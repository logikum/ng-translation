/* 3rd party libraries */
import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyValue } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toCurrency',
  pure: false,
  standalone: false
} )
export class ToCurrencyPipe extends TranslationPipeBase implements PipeTransform {

  transform(
    value: CurrencyValue,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localizer.currency(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
