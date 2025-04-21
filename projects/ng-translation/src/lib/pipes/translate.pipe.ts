/* 3rd party libraries */
import { Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'translate',
  pure: false,
  standalone: false
} )
export class TranslatePipe extends TranslationPipeBase implements PipeTransform {

  transform(
    key: string,
    args?: any
  ): string {

    if (!this.isValid) {
      this.localized = this.translation.get( key, args );
      this.isValid = true;
    }
    return this.localized;
  }
}
