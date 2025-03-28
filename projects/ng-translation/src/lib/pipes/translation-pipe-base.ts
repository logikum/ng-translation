/* 3rd party libraries */
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component( {
    template: '',
    standalone: false
} )
export abstract class TranslationPipeBase {

  protected isValid = false;
  protected localized: string;

  constructor(
    protected readonly cdRef: ChangeDetectorRef,
    protected readonly translation: TranslationService
  ) {
    this.translation.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.isValid = false;
        this.cdRef.markForCheck();
      } );
  }
}
