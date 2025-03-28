/* 3rd party libraries */
import { ChangeDetectorRef, Directive, Input, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';

@Directive( {
    selector: '[translate2]',
    standalone: false
} )
export class Translate2Directive {

  private _key?: string;
  private _params?: any;

  @Input( 'translate2' )
  set key(value: string) {
    if (this._key && value !== this._key) {
      this._key = value;
      this.translateText();
    }
  }
  @Input( 'translateParams' )
  set params(value: any | undefined) {
    if (value !== this._params) {
      this._params = value;
      this.translateText();
    }
  }

  constructor(
    private readonly container: ViewContainerRef,
    private readonly cdRef: ChangeDetectorRef,
    private readonly translate: TranslationService
  ) {
    translate.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.translateText();
      } );
  }

  private translateText(): void {

    if (this._key) {
      this.container.element.nativeElement.innerText =
        this.translate.get( this._key, this._params );
      this.cdRef.markForCheck();
    }
  }
}
