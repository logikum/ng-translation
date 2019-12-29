import { Subscription } from 'rxjs';
import { TranslationService } from './translation.service';

export class TranslatableTextList {

  private names = new Map();
  private texts = new Map();
  private subscription: Subscription;

  constructor(
    private translate: TranslationService,
    private keyList: string | Array<string> | object
  ) {
    if (typeof this.keyList === 'string') {

      this.names.set( this.keyList, this.keyList );

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

    this.subscription = this.translate.languageChanged
      .subscribe( language => {
        this.translateTexts();
      } );
    this.translateTexts();
  }

  private translateTexts(): void {
    this.texts.clear();
    this.names.forEach( (value, key) => {
      this.texts.set( value, this.translate.get( key ) );
    } );
  }

  get(
    key: string,
    args?: any
  ): string {

    const translation = this.texts.get( key );
    return translation ? this.translate.insert( translation, args ) : key;
  }

  destroy(): void {
    this.subscription.unsubscribe();
  }
}
