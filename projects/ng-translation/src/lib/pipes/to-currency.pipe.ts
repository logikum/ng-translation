/* 3rd party libraries */
import { inject, Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { CurrencyValue } from '../types';
import { LocalizationRef } from '../services';
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toCurrency',
  pure: false,
  standalone: false
} )
export class ToCurrencyPipe extends TranslationPipeBase implements PipeTransform {

  private readonly localize = inject( LocalizationRef );

  transform(
    value: CurrencyValue,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localize.currency(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
