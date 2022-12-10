/* 3rd party libraries */
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';

@Component( {
  template: ''
} )
export abstract class TranslationPipeBase implements OnDestroy {

  private readonly onDestroy: Subject<void> = new Subject();
  protected isValid = false;
  protected localized: string;

  constructor(
    protected readonly cdRef: ChangeDetectorRef,
    protected readonly translation: TranslationService
  ) {
    this.translation.languageChanged
      .pipe( takeUntil( this.onDestroy ) )
      .subscribe( language => {
        this.isValid = false;
        this.cdRef.markForCheck();
      } );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
