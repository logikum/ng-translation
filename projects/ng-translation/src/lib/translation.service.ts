import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationConfig } from './translation.config';

let translations: object = {};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  static initialize(
    config: TranslationConfig,
    http: HttpClient
  ): () => Promise<any> {
    return () => {
      return new Promise((resolve, reject) => {
        http.get( config.translationUrl ).toPromise()
          .then( defaultTranslations => {
            translations = defaultTranslations;
            resolve();
          } );
      });
    };
  }

  constructor(
    private http: HttpClient
  ) { }

  get(
    language: string,
    key: string,
    args?: any
  ): string {

    // let result: any = this.translations[ language ];
    let result: any = translations[ language ];
    const path: string[] = key.split( '.' );

    for (let i = 0; i < path.length; i++) {
      result = result[ path[ i ] ];
    }
    return result || '---';
  }
}
