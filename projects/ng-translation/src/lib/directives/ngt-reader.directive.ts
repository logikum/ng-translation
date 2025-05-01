/* 3rd party libraries */
import {
  Directive, inject, Input, OnChanges, OnInit, Optional, SimpleChanges,
  TemplateRef, ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* locally accessible feature module code, always use a relative path */
import { TranslationReader, TranspileData } from '../models';
import { LocalizationRef, TranslationService, InterpolationService } from '../services';
import { createLocalizeContext } from './create-localize-context';

@Directive( {
  selector: '[ngtReader]',
  standalone: false
} )
export class NgtReaderDirective implements OnInit, OnChanges {

  private readonly container = inject( ViewContainerRef );
  @Optional() private readonly template = inject( TemplateRef<TranslationReader> );
  private readonly translation = inject( TranslationService );
  private readonly transpiler = inject( InterpolationService );
  private readonly localization = inject( LocalizationRef );

  @Input( 'ngtReader' ) key?: string;
  @Input() ngtReaderNode?: string;

  constructor() {

    this.translation.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.initialize();
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

    let reader = {};
    const group = this.translation.getGroup( this.ngtReaderNode );
    if (group && typeof group === 'object') {
      reader = this.getReaderObject( group );
    }
    return reader;
  }

  private getReaderObject(
    group: object
  ): object {

    const obj = { };
    for (const property in group) {

      if (group.hasOwnProperty( property )) {
        if (typeof group[ property ] === 'string') {
          obj[ property ] = this.getTranspilingFunction(
            `${ this.ngtReaderNode }.${ property }`,
            group[ property ]
          );
        } else if (typeof group[ property ] === 'object') {
          obj[ property ] = this.getReaderObject( group[ property ] );
        }
      }
    }
    return obj;
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
        return this.transpiler.insert( data, args.length > 1 ? args : args[ 0 ] );
      }
    };
  }
}
