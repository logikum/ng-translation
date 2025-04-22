/* 3rd party libraries */
import { inject, Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { LocalizationRef } from '../services';
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toMoney',
  pure: false,
  standalone: false
} )
export class ToMoneyPipe extends TranslationPipeBase implements PipeTransform {

  private readonly localize = inject( LocalizationRef );

  transform(
    value: number,
    args?: string
  ): string {

    if (!this.isValid) {
      const ix = (args || '').indexOf( '|' );
      const currency = ix < 0 ? args : args.substring( 0, ix ).trim();
      const opts = ix < 0 ? '' : args.substring( ix + 1 );

      this.localized = this.localize.money(
        this.translation.activeLanguage, value, currency, opts
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
