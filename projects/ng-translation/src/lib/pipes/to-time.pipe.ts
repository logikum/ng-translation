/* 3rd party libraries */
import { Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'toTime',
  pure: false,
  standalone: false
} )
export class ToTimePipe extends TranslationPipeBase implements PipeTransform {

  transform(
    value: Date | number | string,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localizer.time(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }
}
