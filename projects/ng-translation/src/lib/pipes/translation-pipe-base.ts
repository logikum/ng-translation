/* 3rd party libraries */
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalizationRef, NGT_FORMATTER_SERVICE } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { TranslationService } from '../translation.service';

@Component( {
  template: '',
  standalone: false
} )
export abstract class TranslationPipeBase {

  private readonly cdRef = inject( ChangeDetectorRef );
  protected readonly translation = inject( TranslationService );
  private readonly formatter = inject( NGT_FORMATTER_SERVICE );
  protected readonly localizer: LocalizationRef;
  protected isValid = false;
  protected localized: string;

  constructor() {

    this.translation.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.isValid = false;
        this.cdRef.markForCheck();
      } );
    this.localizer = this.formatter.getLocalizationRef();
  }
}
