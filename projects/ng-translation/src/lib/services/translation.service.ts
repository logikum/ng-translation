/* 3rd party libraries */
import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';

/* locally accessible feature module code, always use relative path */
import {
  Locale, NGT_CONFIGURATION, NGT_TRANSLATION_CONVERTER, NGT_TRANSPILE_EXTENDER,
  Resource, ResourceList, ResourceLoader, TranslationChange, TranslationConfig,
  TranslationConverter, TranspileExtender, LocalizeContext
} from '../models';
import { TranspilerService } from './transpiler.service';
import { MessengerService } from './messenger.service';
import { ArrayBufferLoader, BlobLoader, JsonLoader, TextLoader } from '../loaders';
import { CurrencyValue } from '../types';

@Injectable( {
  providedIn: 'root'
} )
export class TranslationService implements LocalizeContext {

  private isLoading = true;
  private active: string;
  private browserLanguageIsSupported = false;
  private readonly defaultLanguage: string;
  private readonly allowedLanguages: Array<string>;
  private readonly resourceList: ResourceList;
  private readonly translations: object = { };

  @Output() readonly languageChanged = new EventEmitter<string>();
  @Output() readonly statusChange = new EventEmitter<TranslationChange>();

  get activeLanguage(): string {
    return this.active;
  }

  get isDownloading(): boolean {
    return this.isLoading;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly transpile: TranspilerService,
    private readonly messenger: MessengerService,
    @Inject( NGT_CONFIGURATION ) private readonly config: TranslationConfig,
    @Inject( NGT_TRANSLATION_CONVERTER ) private readonly converter: TranslationConverter,
    @Inject( NGT_TRANSPILE_EXTENDER ) private readonly extender: TranspileExtender
  ) {
    this.defaultLanguage = config.defaultLanguage;
    this.messenger.disableWarnings = config.disableWarnings;
    this.transpile.extender = extender;
    this.resourceList = new ResourceList(
      messenger,
      config.sections,
      config.translationPath,
      config.translationFormat,
      config.loaderType
    );
    if (config.allowedLanguages && config.allowedLanguages.length) {
      this.allowedLanguages = config.allowedLanguages;
      if (this.allowedLanguages.indexOf( config.defaultLanguage ) < 0) {
        this.allowedLanguages.push( config.defaultLanguage );
      }
    }
  }

  initializeApp(): Promise<boolean> {

    this.statusChange.emit( TranslationChange.event( 'app', 'start' ) );
    return new Promise( ( resolve, reject ) => {

      const languages: Array<string> = this.getInitialLanguages();

      const promises: Array<Promise<object>> = this.getDownloadPromises(
        languages,
        this.resourceList.getResources( '' )
      );
      Promise.all( promises )
        .then( () => {
          this.isLoading = false;
          this.statusChange.emit( TranslationChange.event( 'app', 'finish' ) );
          resolve( this.browserLanguageIsSupported );
        } )
        .catch( error => {
          this.isLoading = false;
          this.statusChange.emit( TranslationChange.event( 'app', 'finish' ) );
          reject( error );
        } );
    } );
  }

  initializeModule(
    route: Route
  ): Promise<boolean> {

    if (this.isLoading) {
      return Promise.reject( false );
    }
    const module = route.data && route.data.translationGroup ?
      route.data.translationGroup :
      route.path;
    this.statusChange.emit( TranslationChange.event( 'module', 'start', module ) );

    return new Promise( ( resolve, reject ) => {

      const languages: Array<string> = Object.getOwnPropertyNames( this.translations );
      const promises: Array<Promise<object>> = this.getDownloadPromises(
        languages,
        this.resourceList.getResources( module )
      );
      this.isLoading = true;
      Promise.all( promises )
        .then( () => {
          this.isLoading = false;
          this.statusChange.emit( TranslationChange.event( 'module', 'finish', module ) );
          resolve( true );
        } )
        .catch( error => {
          this.isLoading = false;
          this.statusChange.emit( TranslationChange.event( 'module', 'finish', module ) );
          reject( error );
        } );
    } );
  }

  changeLanguage(
    language: string
  ): Promise<any> {

    return new Promise( ( resolve, reject ) => {

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
        const safeLanguage = this.getAllowedLanguage( language );
        if (!safeLanguage) {
          this.messenger.warn( `Language '${ language }' is not allowed.` );
          resolve();
          return;
        }

        this.statusChange.emit( TranslationChange.event( 'language', 'start', safeLanguage ) );

        const promises: Promise<any>[] = this.getDownloadPromises(
          [ locale.name ],
          this.resourceList.getResourcesInUse()
        );
        Promise.all( promises )
          .then( () => {
            this.active = this.translations[ locale.name ] ? locale.name : locale.neutral;
            this.languageChanged.emit( safeLanguage );
            this.statusChange.emit( TranslationChange.event( 'language', 'finish', safeLanguage ) );
            resolve();
          } )
          .catch( error => {
            this.statusChange.emit( TranslationChange.event( 'language', 'finish', safeLanguage ) );
            reject( error );
          } );
      }
    } );
  }

  // region Helper methods

  private getInitialLanguages(): Array<string> {

    this.active = this.defaultLanguage;
    const languages: Array<string> = [ this.defaultLanguage ];

    if (navigator.language && navigator.language !== this.defaultLanguage) {
      const browserLanguage = this.getAllowedLanguage( navigator.language );
      if (browserLanguage) {
        this.active = browserLanguage;
        this.browserLanguageIsSupported = true;
        languages.push( browserLanguage );
      }
    }
    return languages;
  }

  private getAllowedLanguage(
    language: string
  ): string {

    if (this.allowedLanguages) {
      const locale = new Locale( language );

      if (this.allowedLanguages.indexOf( locale.name ) !== -1) {
        return locale.name;
      } else if (locale.hasRegion && this.allowedLanguages.indexOf( locale.neutral ) !== -1) {
        return locale.neutral;
      }
    } else {
      return language;
    }
    return '';
  }

  private getDownloadPromises(
    languages: Array<string>,
    resources: Array<Resource>
  ): Array<Promise<any>> {

    const promises: Promise<any>[] = [];

    languages.forEach( language => {
      resources.forEach( resource => {
        let loader: ResourceLoader;

        switch (resource.type) {
          case 'text':
            loader = new TextLoader( this.http, this.messenger );
            break;
          case 'blob':
            loader = new BlobLoader( this.http, this.messenger );
            break;
          case 'arraybuffer':
            loader = new ArrayBufferLoader( this.http, this.messenger );
            break;
          case 'json':
          default:
            loader = new JsonLoader( this.http, this.messenger );
            break;
        }
        promises.push( loader.load( language, resource )
          .then( translations => {
            this.storeTranslations( language, resource, translations );
          } )
          .catch( error => {
            this.handleError( error );
            this.storeTranslations( language, resource, { } );
          } )
        );
      } );
    } );

    return promises;
  }

  private storeTranslations(
    language: string,
    resource: Resource,
    translations: any
  ): void {

    // Convert non=JSON formats.
    const jsonTranslations: object = resource.format === 'JSON' ?
      translations :
      this.converter.convert( language, resource, translations );

    // Check language property.
    if (this.translations[ language ] === undefined) {
      this.translations[ language ] = { };
    }
    let target = this.translations[ language ];

    // Check section properties.
    const path: Array<string> = resource.alias.split( '.' );
    for (let i = 0; i < path.length; i++) {
      if (target[ path[ i ] ] === undefined) {
        target[ path[ i ] ] = i === path.length - 1 ? jsonTranslations : { };
      }
      target = target[ path[ i ] ];
    }
  }

  private handleError(
    error: any
  ): void {

    const message = error ?
      (error.message ? error.message : error.toString()) :
      'An error occurred while downloading a translation file.'
    ;
    this.messenger.error( message );
  }

  showError(
    message: string
  ): void {

    this.messenger.error( message );
  }

  // endregion

  // region Get translation item

  get(
    key: string,
    args?: any
  ): string {

    return this.isLoading ? '' : this.translate( this.active, key, args );
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
      this.messenger.warn( `Missing translation text: [${ locale.name }] ${ key }` );

      // ...try invariant culture (default language)
      locale = new Locale( this.defaultLanguage );
      translation = this.find( locale.name, key );

      // If not found still try invariant neutral culture.
      if (translation === key && locale.hasRegion) {
        translation = this.find( locale.neutral, key );
      }
    }
    // Insert eventual arguments.
    return this.insert( key, translation, args );
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
    key: string,
    text: string,
    args?: any
  ): string {

    return this.transpile.insert(
      {
        key: key,
        locale: this.active,
        text: text
      },
      args
    );
  }

  // endregion

  // region Get translation group

  getGroup(
    key: string
  ): object {

    if (this.isLoading) {
      return null;
    }
    let locale = new Locale( this.active );

    // Try the requested (eventual specific) culture (language).
    let group: object = this.findGroup( locale.name, key );

    // If not found try neutral culture (language without country/region).
    if (group === null && locale.hasRegion) {
      group = this.findGroup( locale.neutral, key );
    }

    // Finally if not found...
    if (group === null) {

      // Warning of missing translation text.
      this.messenger.warn( `Missing translation group: [${ locale.name }] ${ key }` );

      // ...try invariant culture (default language)
      locale = new Locale( this.defaultLanguage );
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

  // endregion

  //region Implement LocalizeContext

  number(
    value: number,
    args?: string
  ): string {

    return this.transpile.number( this.activeLanguage, value, args );
  }

  percent(
    value: number,
    args?: string
  ): string {

    return this.transpile.percent( this.activeLanguage, value, args );
  }

  currency(
    value: CurrencyValue,
    args?: string
  ): string {

    return this.transpile.currency( this.activeLanguage, value, args );
  }

  ccy(
    value: number,
    currency: string,
    args?: string
  ): string {

    return this.transpile.ccy( this.activeLanguage, value, currency, args );
  }

  datetime(
    value: Date | number | string,
    args?: string
  ): string {

    return this.transpile.datetime( this.activeLanguage, value, args );
  }

  //endregion
}
