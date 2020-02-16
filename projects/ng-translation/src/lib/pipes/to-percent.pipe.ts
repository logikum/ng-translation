import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LocalizationService, TranslationService } from '../services';

@Pipe({
  name: 'toPercent',
  pure: false
})
export class ToPercentPipe implements PipeTransform, OnDestroy {

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
    value: number,
    args?: string
  ): string {

    if (!this.isValid) {
      this.localized = this.localization.percent(
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
