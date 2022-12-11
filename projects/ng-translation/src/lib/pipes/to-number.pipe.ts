/* 3rd party libraries */
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { LocalizationService, TranslationService } from '../services';
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toNumber',
  pure: false
} )
export class ToNumberPipe extends TranslationPipeBase implements PipeTransform {

  constructor(
    protected readonly cdRef: ChangeDetectorRef,
    protected readonly translation: TranslationService,
    private readonly localization: LocalizationService
  ) {
    super( cdRef, translation );
  }

  transform(
    value: number,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localization.number(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
