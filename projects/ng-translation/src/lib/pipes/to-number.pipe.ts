/* 3rd party libraries */
import { inject, Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { LocalizationRef } from '../services';
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toNumber',
  pure: false,
  standalone: false
} )
export class ToNumberPipe extends TranslationPipeBase implements PipeTransform {

  private readonly localize = inject( LocalizationRef );

  transform(
    value: number,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localize.number(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
