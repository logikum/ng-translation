/* 3rd party libraries */
import {
  ChangeDetectorRef, Directive, Input, OnChanges, OnInit,
  Optional, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* locally accessible feature module code, always use relative path */
import { CurrencyValue } from '../types';
import { FormatData, TranslateContext } from '../models';
import { LocalizationService, TranslationService } from '../services';

@Directive( {
  selector: '[ngtContext]',
  standalone: false
} )
export class NgtContextDirective implements OnInit, OnChanges {

  @Input( 'ngtContext' ) key?: string;
  @Input() ngtContextNode?: string;

  constructor(
    private readonly container: ViewContainerRef,
    @Optional() private template: TemplateRef<TranslateContext>,
    private readonly cdRef: ChangeDetectorRef,
    private readonly translate: TranslationService,
    private readonly localization: LocalizationService
  ) {
    translate.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.cdRef.markForCheck();
      } );
  }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {
    const isUpdate = Object.keys( changes )
      .some( p => changes[ p ].firstChange === false );
    if (isUpdate) {
      this.initialize();
    }
  }

  private initialize(): void {

    const service = this.translate;
    const localize = this.localization;
    const keyRoot = this.ngtContextNode;
    const self = this;
    const context: TranslateContext = {
      $implicit: function (
        key: string,
        args?: any
      ): string {
        if (service.isDownloading) {
          return '';
        } else if (key.startsWith( '/' )) {
          return service.get( key.substring( 1 ), args );
        } else if (keyRoot) {
          return service.get( self.merge( keyRoot, key ), args );
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
        ccy(
          value: number,
          currency: string,
          args: string
        ): string {
          return localize.currency( service.activeLanguage, [ value, currency ], args );
        },
        datetime(
          value: Date | number | string,
          args: string
        ): string {
          return localize.datetime( service.activeLanguage, value, args );
        }
      }
    };
    if (this.translate.formatNameExtensions.length) {
      this.translate.formatNameExtensions.forEach( formatName => {

        context.localize[formatName] = (value: any, params?: string): string => {
          const formatData: FormatData = {
            key: undefined,
            locale: this.translate.activeLanguage,
            params: params || '',
            value: value
          };
          return this.translate.custom( formatName, formatData );
        };
      } );
    }
    this.container.clear();
    this.container.createEmbeddedView( this.template, context );
  }

  private merge(
    keyRoot: string,
    key: string
  ): string {

    if (key.startsWith('../')) {

      let head = keyRoot;
      let tail = key;
      do {
        const nodes = head.split( '.' );
        if (nodes.length > 1) {
          nodes.splice( -1, 1 );
          head = nodes.join('.');
        } else {
          head = '';
        }
        tail = tail.substring( 3 );
      } while (tail.startsWith('../'));

      return `${ head }.${ tail }`;
    } else {
      return `${ keyRoot }.${ key }`;
    }
  }
}
