/* 3rd party libraries */
import { inject, Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { LocalizationRef } from '../services';
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toPercent',
  pure: false,
  standalone: false
} )
export class ToPercentPipe extends TranslationPipeBase implements PipeTransform {

  private readonly localize = inject( LocalizationRef );

  transform(
    value: number,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localize.percent(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
