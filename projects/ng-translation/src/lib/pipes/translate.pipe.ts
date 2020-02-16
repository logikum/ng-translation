/* 3rd party libraries */
import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy  {

  private readonly onDestroy: Subject<void> = new Subject();
  private isValid = false;
  private localized: string;

  constructor(
    private readonly translation: TranslationService
  ) {
    this.translation.languageChanged
      .pipe( takeUntil( this.onDestroy ) )
      .subscribe( language => {
        this.isValid = false;
      } );
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
