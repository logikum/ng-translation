/* 3rd party libraries */
import {
  ChangeDetectorRef, Directive, inject, Input, OnChanges, OnInit,
  Optional, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalizationRef, NGT_FORMATTER_SERVICE } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { TranslateContext } from '../models';
import { TranslationService } from '../services';
import { createLocalizeContext } from './create-localize-context';

@Directive( {
  selector: '[ngtContext]',
  standalone: false
} )
export class NgtContextDirective implements OnInit, OnChanges {

  private readonly container = inject( ViewContainerRef );
  @Optional() private readonly template = inject( TemplateRef<TranslateContext> );
  private readonly changeDetector = inject( ChangeDetectorRef );
  private readonly translation = inject( TranslationService );
  private readonly formatter = inject( NGT_FORMATTER_SERVICE );
  private readonly localizer: LocalizationRef;

  @Input( 'ngtContext' ) key?: string;
  @Input() ngtContextNode?: string;

  constructor() {

    this.translation.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.changeDetector.markForCheck();
      } );
    this.localizer = this.formatter.getLocalizationRef();
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

    const service = this.translation;
    const localize = this.localizer;
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
      localize: createLocalizeContext( service, localize )
    };
    this.container.clear();
    this.container.createEmbeddedView( this.template, context );
  }

  private merge(
    keyRoot: string,
    key: string
  ): string {

    if (key.startsWith( '../' )) {

      let head = keyRoot;
      let tail = key;
      do {
        const nodes = head.split( '.' );
        if (nodes.length > 1) {
          nodes.splice( -1, 1 );
          head = nodes.join( '.' );
        } else {
          head = '';
        }
        tail = tail.substring( 3 );
      } while (tail.startsWith( '../' ));

      return `${ head }.${ tail }`;
    } else {
      return `${ keyRoot }.${ key }`;
    }
  }
}
