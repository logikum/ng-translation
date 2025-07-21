/* 3rd party libraries */
import { inject, OnChanges, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InterpolationData, NGT_FORMATTER_SERVICE } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { TranslationService } from '../translation.service';

export class TextObject {

  readonly #__translation = inject( TranslationService );
  readonly #__formatter = inject( NGT_FORMATTER_SERVICE );
  readonly #__node: string;

  constructor(
    node: string
  ) {
    this.#__node = node;

    this.#__translation.languageChanged
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.#__initialize();
      } );
    this.#__initialize();
  }

  #__initialize(): void {

    const group = this.#__translation.getGroup( this.#__node );
    if (group && typeof group === 'object') {
      this.#__buildTextNode( this, group );
    }
  }

  #__buildTextNode(
    target: object,
    group: object
  ): void {

    const obj = { };
    for (const property in group) {

      if (group.hasOwnProperty( property )) {
        if (typeof group[ property ] === 'string') {
          target[ property ] = this.#__getTextFunction(
            `${ this.#__node }.${ property }`,
            group[ property ]
          );
        } else if (typeof group[ property ] === 'object') {
          target[ property ] = { };
          this.#__buildTextNode( target[ property ], group[ property ] );
        }
      }
    }
  }

  #__getTextFunction(
    key: string,
    text: string,
  ): ( args: any ) => string {

    return ( ...args ) => {
      if (args === undefined) {
        return text;
      } else {
        const data: InterpolationData = {
          key,
          locale: this.#__translation.activeLanguage,
          text
        };
        return this.#__formatter.insert( data, args.length > 1 ? args : args[ 0 ] );
      }
    };
  }
}
