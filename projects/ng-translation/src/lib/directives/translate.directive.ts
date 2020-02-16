/* 3rd party libraries */
import {
  ChangeDetectorRef, Directive, Input, OnChanges, OnDestroy, OnInit,
  Optional, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* locally accessible feature module code, always use relative path */
import { CurrencyValue, LocalizationService, TranslationService } from '../services';

interface ViewContext {
  $implicit: (key: string, params?: any) => any;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[translate]'
})
export class TranslateDirective implements OnInit, OnChanges, OnDestroy {

  private readonly onDestroy: Subject<void> = new Subject();

  @Input('translate') key: string | undefined;
  @Input('translateParams') params: any | undefined;
  @Input('translateNode') node: string | undefined;

  constructor(
    private readonly container: ViewContainerRef,
    @Optional() private template: TemplateRef<ViewContext>,
    private readonly cdRef: ChangeDetectorRef,
    private readonly translate: TranslationService,
    private readonly localization: LocalizationService
  ) {
    translate.languageChanged
      .pipe( takeUntil( this.onDestroy ) )
      .subscribe( language => {
        if (this.key) {
          // Attribute directive.
          this.container.element.nativeElement.innerText = this.translate.get( this.key, this.params );
        } else {
          // Structural directive.
          this.cdRef.markForCheck();
        }
    } );
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {
    const isUpdate = Object.keys(changes).some(p => changes[p].firstChange === false);
    if (isUpdate) {
      this.initialize();
    }
  }

  private initialize(): void {

    if (this.key) {
      // Attribute directive.
      this.container.element.nativeElement.innerText = this.translate.get( this.key, this.params );
    } else {
      // Structural directive.
      const service = this.translate;
      const localize = this.localization;
      const keyRoot = this.node;
      const context = {
        $implicit: function (
          key: string,
          args?: any
        ): string {
          if (service.isDownloading) {
            return '';
          } else if (key.startsWith( '/' )) {
            return service.get( key.substr( 1 ), args );
          } else if (keyRoot) {
            return service.get( `${ keyRoot }.${ key }`, args );
          } else {
            return service.get( key, args );
          }
        },
        localize: {
          number(
            value: number,
            args: string
          ): string {
            return localize.number( service.activeLanguage, value, args );
          },
          percent(
            value: number,
            args: string
          ): string {
            return localize.percent( service.activeLanguage, value, args );
          },
          currency(
            value: CurrencyValue,
            args: string
          ): string {
            return localize.currency( service.activeLanguage, value, args );
          },
          datetime(
            value: Date | number | string,
            args: string
          ): string {
            return localize.datetime( service.activeLanguage, value, args );
          }
        }
      };
      this.container.clear();
      this.container.createEmbeddedView( this.template, context );
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
