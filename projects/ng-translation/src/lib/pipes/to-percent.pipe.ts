/* 3rd party libraries */
import { Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toPercent',
  pure: false,
  standalone: false
} )
export class ToPercentPipe extends TranslationPipeBase implements PipeTransform {

  transform(
    value: number,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localizer.percent(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
