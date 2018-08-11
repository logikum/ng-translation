import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationConfig } from './translation.config';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations: object = {};

  constructor(
    private http: HttpClient
  ) { }

  initialize(
    config: TranslationConfig
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get( config.translationUrl ).toPromise()
        .then( defaultTranslations => {
          this.translations = defaultTranslations;
          resolve();
        } );
    });
  }

  get(
    language: string,
    key: string,
    args?: any
  ): string {

    // let result: any = this.translations[ language ];
    let result: any = this.translations[ language ];
    const path: string[] = key.split( '.' );

    for (let i = 0; i < path.length; i++) {
      result = result[ path[ i ] ];
    }
    return result || '---';
  }
}
