/* 3rd party libraries */
import {
  ChangeDetectorRef, Directive, inject, Input, OnChanges, OnInit,
  Optional, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* locally accessible feature module code, always use relative path */
import { TranslationReader, TranspileData } from '../models';
import {
  LocalizationRef,
  TranslationService,
  TranspilerService
} from '../services';
import { createLocalizeContext } from './create-localize-context';

@Directive( {
  selector: '[ngtReader]',
  standalone: false
} )
export class NgtReaderDirective implements OnInit, OnChanges {

  private readonly container = inject( ViewContainerRef );
  @Optional() private template = inject( TemplateRef<TranslationReader> );
  private readonly changeDetector = inject( ChangeDetectorRef );
  private readonly translation = inject( TranslationService );
  private readonly transpiler = inject( TranspilerService );
  private readonly localization = inject( LocalizationRef );

  @Input( 'ngtReader' ) key?: string;
  @Input() ngtReaderNode?: string;

  constructor() {

    this.translation.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.changeDetector.markForCheck();
      } );
  }

  ngOnInit(): void {

    if (!this.ngtReaderNode) {
      throw new Error( 'ngtReader directive requires translation node value.' );
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

    const service = this.translation;
    const localize = this.localization;
    const context: TranslationReader = {
      $implicit: this.getReader(),
      localize: createLocalizeContext( service, localize )
    };
    this.container.clear();
    this.container.createEmbeddedView( this.template, context );
  }

  private getReader(): object {

    const reader = {};
    const node = this.translation.getGroup( this.ngtReaderNode );
    if (node && typeof node === 'object') {

      for (const property in node) {
        if (node.hasOwnProperty( property ) && typeof node[ property ] === 'string') {
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
  ): ( args: any ) => string {

    return ( ...args ) => {
      if (args === undefined) {
        return text;
      } else {
        const data: TranspileData = {
          key,
          locale: this.translation.activeLanguage,
          text
        };
        return this.transpiler.insert( data, args );
      }
    };
  }
}
