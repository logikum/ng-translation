/* 3rd party libraries */
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { CurrencyValue } from '../types';
import { LocalizationService, TranslationService } from '../services';
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toCurrency',
  pure: false
} )
export class ToCurrencyPipe extends TranslationPipeBase implements PipeTransform {

  constructor(
    protected readonly cdRef: ChangeDetectorRef,
    protected readonly translation: TranslationService,
    private readonly localization: LocalizationService
  ) {
    super( cdRef, translation );
  }

  transform(
    value: CurrencyValue,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localization.currency(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
