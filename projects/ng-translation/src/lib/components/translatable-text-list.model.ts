/* 3rd party libraries */
import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* locally accessible feature module code, always use relative path */
import { TextListKeys } from '../types';
import { TranslationService } from '../services';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class TranslatableTextList implements OnDestroy {

  private readonly onDestroy: Subject<void> = new Subject();
  private readonly names = new Map();
  private readonly texts = new Map();

  constructor(
    private readonly translate: TranslationService,
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

    this.translate.languageChanged
      .pipe( takeUntil( this.onDestroy ) )
      .subscribe( language => {
        this.translateTexts();
      } );
    this.translateTexts();
  }

  private translateTexts(): void {
    this.texts.clear();
    this.names.forEach( ( value, key ) => {
      const result = this.translate.get( key );

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

    const translation = this.texts.get( key );
    return translation ? this.translate.insert( key, translation, args ) : key;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
