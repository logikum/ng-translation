/* 3rd party libraries */
import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* locally accessible feature module code, always use relative path */
import { LocalizationService, TranslationService } from '../services';

@Pipe({
  name: 'toDatetime',
  pure: false
})
export class ToDatetimePipe implements PipeTransform, OnDestroy {

  private readonly onDestroy: Subject<void> = new Subject();
  private isValid = false;
  private localized: string;

  constructor(
    private readonly translation: TranslationService,
    private readonly localization: LocalizationService
  ) {
    this.translation.languageChanged
      .pipe( takeUntil( this.onDestroy ) )
      .subscribe( language => {
        this.isValid = false;
      } );
  }

  transform(
    value: Date | number | string,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localization.datetime(
        this.translation.activeLanguage, value, args
      );
      this.isValid = true;
    }
    return this.localized;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}