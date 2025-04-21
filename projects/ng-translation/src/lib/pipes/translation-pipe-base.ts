/* 3rd party libraries */
import { ChangeDetectorRef, Component, inject } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component( {
  template: '',
  standalone: false
} )
export abstract class TranslationPipeBase {

  private readonly cdRef = inject( ChangeDetectorRef );
  protected readonly translation = inject( TranslationService );
  protected isValid = false;
  protected localized: string;

  constructor() {

    this.translation.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.isValid = false;
        this.cdRef.markForCheck();
      } );
  }
}
