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

  @Output() languageChange = new EventEmitter<string>();

  get activeLanguage(): string { return this.active; }

  constructor(
    private http: HttpClient
  ) { }

  initializeApp(
    config: TranslationConfig
  ): Promise<any> {

    this.config = config;
    this.active = config.defaultLanguage;
    const languages: string[] = [ config.defaultLanguage ];

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
        } );
    } );
  }

  get(
    key: string,
    args?: any
  ): string {

    const path: string[] = key.split( '.' );
    let result: any = this.translations[ this.active ];
    for (let i = 0; i < path.length; i++) {
      if (result) {
        result = result[ path[ i ] ];
      } else {
        break;
      }
    }
    return result || key;
  }
}
