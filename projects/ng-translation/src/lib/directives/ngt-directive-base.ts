/* 3rd party libraries */
import { ChangeDetectorRef, inject, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* locally accessible feature module code, always use a relative path */
import { TranslationService } from '../services';

export abstract class NgtDirectiveBase {

  private readonly container = inject( ViewContainerRef );
  private readonly changeDetector = inject( ChangeDetectorRef );
  private readonly translation = inject( TranslationService );
  private keyValue?: string;
  private paramsValue?: any;

  abstract set key( value: string );

  abstract set params( value: any );

  protected abstract isHtml: boolean;

  protected constructor() {

    this.translation.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.translateText();
      } );
  }

  protected setKeyValue(
    value: string
  ): void {

    if (value && value !== this.keyValue) {
      this.keyValue = value;
      this.translateText();
    }
  }

  protected setParamsValue(
    value?: any
  ): void {
    if (value !== this.paramsValue) {
      this.paramsValue = value;
      this.translateText();
    }
  }

  private translateText(): void {

    if (this.keyValue) {
      const text = this.translation.get( this.keyValue, this.paramsValue );
      if (this.isHtml) {
        this.container.element.nativeElement.innerHTML = text;
      } else {
        this.container.element.nativeElement.innerText = text;
      }
      this.changeDetector.markForCheck();
    }
  }
}
