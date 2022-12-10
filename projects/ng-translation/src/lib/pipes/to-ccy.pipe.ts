/* 3rd party libraries */
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { LocalizationService, TranslationService } from '../services';
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toCcy',
  pure: false
} )
export class ToCcyPipe extends TranslationPipeBase implements PipeTransform {

  constructor(
    protected readonly cdRef: ChangeDetectorRef,
    protected readonly translation: TranslationService,
    private readonly localization: LocalizationService
  ) {
    super( cdRef, translation );
  }

  transform(
    value: number,
    args: string
  ): string {

    if (!this.isValid) {
      const ix = (args || '').indexOf( '|' );
      const currency = ix < 0 ? args : args.substr( 0, ix );
      const opts = ix < 0 ? '' : args.substr( ix + 1 );
      this.localized = this.localization.currency(
        this.translation.activeLanguage, [ value, currency ], opts
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
