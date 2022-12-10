/* 3rd party libraries */
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { LocalizationService, TranslationService } from '../services';
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toDatetime',
  pure: false
} )
export class ToDatetimePipe extends TranslationPipeBase implements PipeTransform {

  constructor(
    protected readonly cdRef: ChangeDetectorRef,
    protected readonly translation: TranslationService,
    private readonly localization: LocalizationService
  ) {
    super( cdRef, translation );
  }

  transform(
    value: Date | number | string,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localization.datetime(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
