import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { TranslationConfig } from './translation.config';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private config: TranslationConfig;
  private active: string;
  private translations: object = { };
  private errorHandler: (error: any) => void;

  @Output() languageChange = new EventEmitter<string>();

  get activeLanguage(): string { return this.active; }

  constructor(
    private http: HttpClient
  ) { }

  initializeApp(
    config: TranslationConfig,
    errorHandler?: (error: any) => void
  ): Promise<any> {

    this.config = config;
    this.active = config.defaultLanguage;
    const languages: string[] = [ config.defaultLanguage ];
    this.errorHandler = errorHandler ? errorHandler : this.handleError;

    if (config.activeLanguage && config.activeLanguage !== config.defaultLanguage ) {
      languages.push( config.activeLanguage );
      this.active = config.activeLanguage;
    }
    const promises: Promise<object>[] = this.getDownloadPromises( languages );

    return Promise.all( promises );
  }

  initializeSection(
    route: Route
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const languages: string[] = Object.getOwnPropertyNames( this.translations );
      const promises: Promise<object>[] = this.getDownloadPromises( languages, route.path );

      Promise.all( promises )
        .then( () => {
          resolve( true );
        });
    } );
  }

  changeLanguage(
    language: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {

      this.active = language;

      if (!this.translations[ language ]) {
        const promises: Promise<object>[] = [];
        const sections = Object.getOwnPropertyNames( this.translations[ this.config.defaultLanguage ] );

        sections.forEach( section => {
          promises.push(
            this.getDownloadPromise(
              language,
              section.indexOf( ':' ) > 0 ?
                section.split( ':' )[1] :
                section
            )
          );
        } );

        Promise.all( promises )
          .then( () => {
            this.languageChange.emit( language );
            resolve();
          });
      } else {
        this.languageChange.emit( language );
        resolve();
      }
    } );
  }

  private getDownloadPromises(
    languages: string[],
    path?: string
  ): Promise<object>[] {

    const promises: Promise<object>[] = [];

    languages.forEach( language => {
      this.config.sections
        .filter( section => path ?
          section.startsWith( path + ':' ) :
          section.indexOf( ':' ) < 0
        )
        .forEach( section => {
          promises.push(
            this.getDownloadPromise(
              language,
              path ?
                section.split( ':' )[1] :
                section
            )
          );
        } );
    } );

    return promises;
  }

  private getDownloadPromise(
    language: string,
    section: string
  ): Promise<object> {

    const url = this.config.translationUrl
      .replace(/{\s*language\s*}/gi, language)
      .replace(/{\s*section\s*}/gi, section)
      ;
    return new Promise((resolve, reject) => {
      this.http.get( url )
        .toPromise()
        .then( sectionTranslations => {

          if (!this.translations[ language ]) {
            this.translations[ language ] = { };
          }
          this.translations[ language ][ section ] = sectionTranslations;
          resolve();
        } )
        .catch( this.errorHandler );
    } );
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
    args?: object
  ): string {

    return this.translate( this.active, key, args );
  }

  private translate(
    language: string,
    key: string,
    args?: object
  ): string {
  
    // Try the requested (eventual specific) culture (language).
    let translation: string = this.find( language, key );

    // If not found...
    if (translation === key) {
      // ...try neutral culture (language without country/region).
      const pos = language.indexOf( '-' );
      if (pos > 0) {
        translation = this.find( language.substr(0, pos), key );
      }
    }

    // Finally if not found...
    if (translation === key) {
      // ...try invariant culture (default language)
      translation = this.find( this.config.defaultLanguage, key );
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
    args?: object
  ) {
    if (args) {
      const names = Object.getOwnPropertyNames( args );
      names.forEach( name => {
        const re = new RegExp( `\\{\\{\\s*${ name }\\s*\\}\\}`, 'g' );
        text = text.replace( re, args[ name ].toString() );
      } );
    }
    return text;
  }

  getGroup(
    key: string,
    language?: string
  ): object {

    language = language || this.active;

    // Try the requested (eventual specific) culture (language).
    let group: object = this.findGroup( language, key );

    // If not found...
    if (group === null) {
      // ...try neutral culture (language without country/region).
      const pos = language.indexOf( '-' );
      if (pos > 0) {
        group = this.findGroup( language.substr(0, pos), key );
      }
    }

    // Finally if not found...
    if (group === null) {
      // ...try invariant culture (default language)
      group = this.findGroup( this.config.defaultLanguage, key );
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
