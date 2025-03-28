/* 3rd party libraries */
import { Directive, Input, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';

@Directive({
  selector: '[translateHtml]',
  standalone: false
})
export class TranslateHtmlDirective {

  private readonly onDestroy: Subject<void> = new Subject();

  @Input( 'translateHtml' ) key: string | undefined;
  @Input( 'translateParams' ) params: any | undefined;

  constructor(
    private readonly container: ViewContainerRef,
    private readonly translate: TranslationService
  ) {
    translate.languageChanged
      .pipe( takeUntil( this.onDestroy ) )
      .subscribe( language => {
        if (this.key) {
          this.container.element.nativeElement.innerHTML =
            this.translate.get( this.key, this.params );
        }
      } );
  }
}
