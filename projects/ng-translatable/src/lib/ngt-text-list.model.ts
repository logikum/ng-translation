/* 3rd party libraries */
import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TextListKeys, TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

@Directive()
export class NgtTextList {

  private readonly translation = inject(TranslationService);
  private readonly names = new Map();
  private readonly texts = new Map();

  constructor(
    private readonly keyList: TextListKeys
  ) {

    if (typeof this.keyList === 'string') {
      this.names.set( this.keyList, '' );

    } else if (this.keyList instanceof Array) {
      this.keyList.forEach( key => {
        this.names.set( key, key );
      } );

    } else {
      const names = Object.getOwnPropertyNames( this.keyList );
      names.forEach( name => {
        this.names.set( name, this.keyList[ name ] );
      } );
    }

    this.translation.languageChanged
      // @ts-ignore
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.translateTexts();
      } );
    this.translateTexts();
  }

  private translateTexts(): void {
    this.texts.clear();
    this.names.forEach( ( value, key ) => {
      const result = this.translation.get( key ) || { };

      if (typeof result === 'object') {
        const names = Object.getOwnPropertyNames( result );
        names.forEach( name => {
          this.texts.set(
            value ? `${ value }.${ name }` : name,
            result[ name ]
          );
        } );
      } else {
        this.texts.set( value, result );
      }
    } );
  }

  get(
    key: string,
    args?: any
  ): string {

    const text = this.texts.get( key );
    return text ? this.translation.insert( key, text, args ) : key;
  }
}
