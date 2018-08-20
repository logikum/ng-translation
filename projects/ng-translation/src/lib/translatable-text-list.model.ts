import { TranslationService } from './translation.service';

export class TranslatableTextList {

  private names = new Map();
  private texts = new Map();

  constructor(
    private translate: TranslationService,
    private keyList: string | Array<string> | object
  ) {
    if (typeof this.keyList === 'string') {
      this.names.set( this.keyList, this.keyList );
    } else if (this.keyList instanceof( Array )) {
      this.keyList.forEach( key => {
        this.names.set( key, key );
      } );
    } else {
      const names = Object.getOwnPropertyNames( this.keyList );
      names.forEach( name => {
        this.names.set( name, this.keyList[ name ] );
      } );
    }

    this.translate.languageChange.subscribe( language => {
      this.translateTexts();
    } );
    this.translateTexts();
  }

  private translateTexts() {
    this.texts.clear();  
    this.names.forEach( name => {
      this.texts.set( this.names.get( name ), this.translate.get( name) );  
    } );
  }

  get(
    key: string,
    args?: object
  ): string {

    return this.translate.insert( this.texts.get( key ), args );
  }
}
