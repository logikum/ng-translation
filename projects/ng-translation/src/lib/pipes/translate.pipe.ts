/* 3rd party libraries */
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';
import { TranslationPipeBase } from './translation-pipe-base';

@Pipe( {
  name: 'translate',
  pure: false
} )
export class TranslatePipe extends TranslationPipeBase implements PipeTransform {

  constructor(
    protected readonly cdRef: ChangeDetectorRef,
    protected readonly translation: TranslationService
  ) {
    super( cdRef, translation );
  }

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
