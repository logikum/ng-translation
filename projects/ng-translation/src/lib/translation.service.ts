import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslationConfig } from './translation.config';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations: object = {};

  constructor(
    private config: TranslationConfig,
    private http: HttpClient
  ) {
    this.translations = config.default;
  }

  get(
    language: string,
    key: string,
    args?: any
  ): string {

    let result: any = this.translations[ language ];
    const path: string[] = key.split( '.' );

    for (let i = 0; i < path.length; i++) {
      result = result[ path[ i ] ];
    }
    return result || '---';
  }
}
