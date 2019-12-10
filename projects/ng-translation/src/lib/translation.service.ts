import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { TranslationConfig } from './translation-config.model';
import { Locale } from './locale';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private config: TranslationConfig;
  private active: string;
  private translations: object = { };
  private sections: Array<string> = [ ];

  @Output() languageChanged = new EventEmitter<string>();

  get activeLanguage(): string { return this.active; }

  constructor(
    private http: HttpClient
  ) { }

  initializeApp(
    config: TranslationConfig
  ): Promise<boolean> {

    return new Promise((resolve, reject) => {

      this.config = config;
      this.active = config.defaultLanguage;

      const languages: string[] = [ config.defaultLanguage ];
      if (navigator.language && navigator.language !== config.defaultLanguage ) {
        languages.push( navigator.language );
      }
      const sections: string[] = this.config.sections
        .filter( section =>  section.indexOf( ':' ) < 0 );

      const promises: Promise<object>[] = this.getDownloadPromises( languages, sections );
      this.sections.push( ...sections );

      Promise.all( promises )
        .then( () => {
          resolve( this.browserLanguageSupported() );
        } )
        .catch( error => {
          reject( error );
        } );
    } );
  }

  private browserLanguageSupported(): boolean {

    let isSupported = false;

    if (navigator.language) {
      const locale = new Locale( navigator.language );

      if (this.translations[ locale.name ]) {
        isSupported = true;
      } else if (locale.hasRegion && this.translations[ locale.neutral ]) {
        isSupported = true;
      }
    }
    return isSupported;
  }

  initializeSection(
    route: Route
  ): Promise<boolean> {

    return new Promise((resolve, reject) => {

      const prefix = route.data && route.data.sectionPrefix ?
        route.data.sectionPrefix :
        route.path;

      const languages: string[] = Object.getOwnPropertyNames( this.translations );
      const sections: string[] = this.config.sections
        .filter( section => section.startsWith( prefix + ':' ) )
        .map( section => section.split( ':' )[ 1 ] );

      const promises: Promise<object>[] = this.getDownloadPromises( languages, sections );
      this.sections.push( ...sections );

      Promise.all( promises )
        .then( () => {
          resolve( true );
        } )
        .catch( error => {
          reject( error );
        } );
    } );
  }

  changeLanguage(
    language: string
  ): Promise<any> {

    return new Promise((resolve, reject) => {

      const locale = new Locale( language );

      if (this.translations[ locale.name ]) {
        this.active = locale.name;
        this.languageChanged.emit( locale.name );
        resolve();

      } else if (locale.hasRegion && this.translations[ locale.neutral ]) {
        this.active = locale.neutral;
        this.languageChanged.emit( locale.neutral );
        resolve();

      } else {
        const promises: Promise<object>[] = this.getDownloadPromises(
          [ locale.name ], this.sections
        );
        Promise.all( promises )
          .then( () => {
            this.active = this.translations[ locale.name ] ? locale.name : locale.neutral;
            this.languageChanged.emit( language );
            resolve();
          } )
          .catch( error => {
            reject( error );
          } );
      }
    } );
  }

  private getDownloadPromises(
    languages: string[],
    sections: string[]
  ): Promise<object>[] {

    const promises: Promise<object>[] = [];

    languages.forEach( language => {
      sections.forEach( section => {
        promises.push(
          this.getDownloadPromise( language, section )
        );
      } );
    } );

    return promises;
  }

  private getDownloadPromise(
    language: string,
    section: string
  ): Promise<object> {

    const locale = new Locale( language );
    return new Promise((resolve, reject) => {

      const url = this.buildUrl( locale.name, section );
      this.http.get( url )
        .toPromise()
        .then( sectionTranslations => {

          if (!this.translations[ locale.name ]) {
            this.translations[ locale.name ] = { };
          }
          this.storeTranslations( locale.name, section, sectionTranslations);
          resolve();
        } )
        .catch( error => {

          if (locale.hasRegion) {
            console.log( `TRANSLATION alternative: ${ locale.neutral }`);

            const url2 = this.buildUrl( locale.neutral, section );
            this.http.get( url2 )
              .toPromise()
              .then( sectionTranslations => {

                if (!this.translations[ locale.neutral ]) {
                  this.translations[ locale.neutral ] = { };
                }
                this.storeTranslations( locale.neutral, section, sectionTranslations);
                resolve();
              } )
             .catch( error2 => {
               this.handleError( error );
               reject();
             } );

          } else {
            this.handleError( error );
            reject();
          }
        } );
    } );
  }

  private buildUrl(
    language: string,
    section: string
  ): string {

    return this.config.translationUrl
      .replace(/{\s*language\s*}/gi, language)
      .replace(/{\s*section\s*}/gi, section)
    ;
  }

  private storeTranslations(
    language: string,
    section: string,
    sectionTranslations: object
  ): void {

    // Check language property.
    if (this.translations[ language ] === undefined) {
      this.translations[ language ] = { };
    }
    let target = this.translations[ language ];

    // Check section properties.
    const path: string[] = section.split( '.' );
    for (let i = 0; i < path.length; i++) {
      if (target[ path[ i ] ] === undefined) {
        target[ path[ i ] ] = i === path.length - 1 ? sectionTranslations : { };
      }
      target = target[ path[ i ] ];
    }
  }

  private handleError(
    error: any
  ): void {

    const message =
      error ?
        (error.message ? error.message : error.toString()) :
        'An error occurred while downloading a translation file.'
      ;
    console.log( `TRANSLATION ERROR: ${ message }`);
  }

  get(
    key: string,
    args?: any
  ): string {

    return this.translate( this.active, key, args );
  }

  private translate(
    language: string,
    key: string,
    args?: any
  ): string {

    let locale = new Locale( language );

    // Try the requested (eventual specific) culture (language).
    let translation: string = this.find( locale.name, key );

    // If not found try neutral culture (language without country/region).
    if (translation === key && locale.hasRegion) {
      translation = this.find( locale.neutral, key );
    }

    // Finally if not found...
    if (translation === key) {

      // Warning of missing translation text.
      console.log( `Missing translation text: [${ locale.name }] ${ key }` );

      // ...try invariant culture (default language)
      locale = new Locale( this.config.defaultLanguage );
      translation = this.find( locale.name, key );

      // If not found still try invariant neutral culture.
      if (translation === key && locale.hasRegion) {
        translation = this.find( locale.neutral, key );
      }
    }
    // Insert eventual arguments.
    return this.insert( translation, args );
  }

  private find(
    language: string,
    key: string
  ): string {

    const path: string[] = key.split( '.' );
    let result: any = this.translations[ language ];

    for (let i = 0; i < path.length; i++) {
      if (result) {
        result = result[ path[ i ] ];
      } else {
        break;
      }
    }
    return result || key;
  }

  insert(
    text: string,
    args?: any
  ) {
    if (text && args !== undefined) {
      if (args === null) {
        args = 'null';
      }
      if (typeof args === 'string' || typeof args === 'number' || typeof args === 'boolean') {
        args = [ args ];
      }
      if (args instanceof Array) {

        // Replace indexed parameters: 'xxxxxx{{0}}xxxxxxxx{{1}}xxxxxx'
        let index = 0;
        args.forEach( arg => {
          const re = new RegExp( `\\{\\{\\s*${ index++ }\\s*\\}\\}`, 'g' );
          if (re) {
            text = text.replace( re, arg );
          }
        } );
      } else if (typeof args === 'object') {

        // Replace named parameters: 'xxxxxx{{name-A}}xxxxxxxx{{name-B}}xxxxxx'
        const names = Object.getOwnPropertyNames( args );
        names.forEach( name => {
          const re = new RegExp( `\\{\\{\\s*${ name }\\s*\\}\\}`, 'g' );
          if (re) {
            text = text.replace( re, args[ name ] );
          }
        } );
      }
    }
    return text;
  }

  getGroup(
    key: string,
    language?: string
  ): object {

    let locale = new Locale( language || this.active );

    // Try the requested (eventual specific) culture (language).
    let group: object = this.findGroup( locale.name, key );

    // If not found try neutral culture (language without country/region).
    if (group === null && locale.hasRegion) {
      group = this.findGroup( locale.neutral, key );
    }

    // Finally if not found...
    if (group === null) {

      // Warning of missing translation text.
      console.log( `Missing translation group: [${ locale.name }] ${ key }` );

      // ...try invariant culture (default language)
      locale = new Locale( this.config.defaultLanguage );
      group = this.findGroup( locale.name, key );

      // If not found still try invariant neutral culture.
      if (group === null && locale.hasRegion) {
        group = this.findGroup( locale.neutral, key );
      }
    }
    // Return the translation group.
    return group;
  }

  private findGroup(
    language: string,
    key: string
  ): object {

    const path: string[] = key.split( '.' );
    let result: object = this.translations[ language ];
    for (let i = 0; i < path.length; i++) {
      if (result) {
        result = result[ path[ i ] ];
      } else {
        break;
      }
    }
    return result || null;
  }
}
