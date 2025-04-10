/* 3rd party libraries */
import {
  ChangeDetectorRef, Directive, inject, Input, OnChanges, OnInit,
  Optional, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* locally accessible feature module code, always use relative path */
import { CurrencyValue } from '../types';
import { FormatData, TranslationReader, TranspileData } from '../models';
import {
  LocalizationService,
  TranslationService,
  TranspilerService
} from '../services';

@Directive({
  selector: '[ngtReader]'
})
export class NgtReaderDirective implements OnInit, OnChanges {

  private readonly container = inject(ViewContainerRef);
  @Optional() private template = inject(TemplateRef<TranslationReader>);
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly translate = inject(TranslationService);
  private readonly transpiler = inject(TranspilerService);
  private readonly localization = inject(LocalizationService);

  @Input( 'ngtReader' ) key?: string;
  @Input() ngtReaderNode?: string;

  constructor() {
    this.translate.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.cdRef.markForCheck();
      } );
  }

  ngOnInit(): void {

    if (!this.ngtReaderNode) {
      throw new Error('ngtReader directive requires translation node value.');
    }
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
    const reader = this.getReader();
    const context: TranslationReader = {
      $implicit: reader,
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

  private getReader(): object {

    const reader = { };
    const node = this.translate.getGroup( this.ngtReaderNode );
    if (node && typeof node === 'object') {

      for (const property in node) {
        if (node.hasOwnProperty(property)) {

          reader[ property ] = this.getTranspilingFunction(
            `${ this.ngtReaderNode }.${ property }`,
            node[ property ]
          );
        }
      }
    }
    return reader;
  }

  private getTranspilingFunction(
    key: string,
    text: string,
  ): (args: any) => string {

    return (...args) => {
      if (args === undefined) {
        return text;
      } else {
        const data: TranspileData = {
          key,
          locale: this.translate.activeLanguage,
          text
        };
        return this.transpiler.insert( data, args );
      }
    };
  }
}
