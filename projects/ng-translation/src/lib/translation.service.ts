import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { TranslationConfig } from './translation.config';
import { stringDistance } from '../../../../node_modules/codelyzer/util/utils';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private config: TranslationConfig;
  private activeLanguage: string;
  private translations: object = { };

  constructor(
    private http: HttpClient
  ) { }

  initializeApp(
    config: TranslationConfig
  ): Promise<any> {

    this.config = config;
    this.activeLanguage = config.defaultLanguage;
    const languages: string[] = [ config.defaultLanguage ];

    if (config.activeLanguage && config.activeLanguage !== config.defaultLanguage ) {
      languages.push( config.activeLanguage );
      this.activeLanguage = config.activeLanguage;
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
    let result: any = this.translations[ this.activeLanguage ];
    for (let i = 0; i < path.length; i++) {
      result = result[ path[ i ] ];
    }
    return result || '';
  }
}
