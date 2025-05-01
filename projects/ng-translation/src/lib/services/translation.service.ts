/* 3rd party libraries */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  CurrencyValue, FormatData, LocalizationRef, MessengerService,
  NGT_CONFIGURATION, NGT_FORMAT_EXTENDER, NGT_FORMAT_SERVICE
} from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import {
  Locale, NGT_TRANSLATION_CONVERTER, NGT_INLINE_LOADER,
  Resource, ResourceList, ResourceLoader, TranslationChange,
  LocalizeContext
} from '../models';
import {
  ArrayBufferLoader, BlobLoader, JsonLoader, TextLoader, InlineLoader
} from '../loaders';

@Injectable( {
  providedIn: 'root'
} )
export class TranslationService implements LocalizeContext {

  //region Properties

  private readonly config = inject( NGT_CONFIGURATION );
  private readonly loaders = inject( NGT_INLINE_LOADER );
  private readonly converter = inject( NGT_TRANSLATION_CONVERTER );
  private readonly extender = inject( NGT_FORMAT_EXTENDER );
  private readonly formatter = inject( NGT_FORMAT_SERVICE );
  private readonly localizer: LocalizationRef;
  private readonly messenger = inject( MessengerService );
  private readonly http = inject( HttpClient );

  private readonly isInitializedSubject = new BehaviorSubject( false );
  private readonly statusChangeSubject = new Subject<TranslationChange>();
  private readonly languageChangedSubject = new Subject<string>();
  private isLoading = true;
  private active: string;
  private browserLanguageIsSupported = false;
  private readonly defaultLanguage: string;
  private readonly allowedLanguages: Array<string>;
  private readonly resourceList: ResourceList;
  private readonly translations: object = {};

  get isInitialized(): Observable<boolean> {
    return this.isInitializedSubject.asObservable();
  }

  get statusChange(): Observable<TranslationChange> {
    return this.statusChangeSubject.asObservable();
  }

  get languageChanged(): Observable<string> {
    return this.languageChangedSubject.asObservable();
  }

  get activeLanguage(): string {
    return this.active;
  }

  get isDownloading(): boolean {
    return this.isLoading;
  }

  get formatNameExtensions(): string[] {
    return this.extender.formatNames || [];
  }

  //endregion

  //region Initialization

  constructor() {

    this.defaultLanguage = this.config.defaultLanguage;
    this.messenger.disableWarnings = this.config.disableWarnings;
    this.formatter.extender = this.extender;
    this.formatter.extender.translation = this;
    this.localizer = this.formatter.getLocalizationRef();
    this.resourceList = new ResourceList(
      this.messenger,
      this.config.sections,
      this.config.translationPath,
      this.config.translationFormat,
      this.config.loaderType
    );
    if (this.config.allowedLanguages?.length) {
      this.allowedLanguages = this.config.allowedLanguages;
      if (this.allowedLanguages.indexOf( this.config.defaultLanguage ) < 0) {
        this.allowedLanguages.push( this.config.defaultLanguage );
      }
    }
    this.statusChange.subscribe( this.watchInitializationEnd.bind( this ) );
  }

  private watchInitializationEnd(
    change: TranslationChange
  ): void {

    if (change.context === 'app' && change.action === 'finish') {
      this.isInitializedSubject.next( true );
    }
  }

  initializeApp(): Promise<boolean> {

    this.statusChangeSubject.next( TranslationChange.event( 'app', 'start' ) );
    return new Promise( ( resolve, reject ) => {

      const languages: Array<string> = this.getInitialLanguages();

      const promises: Array<Promise<object>> = this.getDownloadPromises(
        languages,
        this.resourceList.getResources( '' )
      );
      Promise.all( promises )
        .then( () => {
          this.isLoading = false;
          this.statusChangeSubject.next( TranslationChange.event( 'app', 'finish' ) );
          resolve( this.browserLanguageIsSupported );
        } )
        .catch( (error: Error) => {
          this.isLoading = false;
          this.statusChangeSubject.next( TranslationChange.event( 'app', 'finish' ) );
          reject( error );
        } );
    } );
  }

  initializeModule(
    route: Route
  ): Promise<boolean> {

    if (this.isLoading) {
      return Promise.resolve( false );
    }
    const module = route.data?.translationGroup ?? route.path;
    this.statusChangeSubject.next( TranslationChange.event( 'module', 'start', module ) );

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
          this.statusChangeSubject.next( TranslationChange.event( 'module', 'finish', module ) );
          resolve( true );
        } )
        .catch( (error: Error) => {
          this.isLoading = false;
          this.statusChangeSubject.next( TranslationChange.event( 'module', 'finish', module ) );
          reject( error );
        } );
    } );
  }

  //endregion

  //region Change language

  changeLanguage(
    language: string
  ): Promise<any> {

    return new Promise<void>( ( resolve, reject ) => {

      const locale = new Locale( language );

      if (this.translations[ locale.name ]) {
        this.active = locale.name;
        this.languageChangedSubject.next( locale.name );
        resolve();

      } else if (locale.hasRegion && this.translations[ locale.neutral ]) {
        this.active = locale.neutral;
        this.languageChangedSubject.next( locale.neutral );
        resolve();

      } else {
        const safeLanguage = this.getAllowedLanguage( language );
        if (!safeLanguage) {
          this.messenger.warn( `Language '${ language }' is not allowed.` );
          resolve();
          return;
        }

        this.statusChangeSubject.next( TranslationChange.event( 'language', 'start', safeLanguage ) );

        const promises: Promise<any>[] = this.getDownloadPromises(
          [ locale.name ],
          this.resourceList.getResourcesInUse()
        );
        Promise.all( promises )
          .then( () => {
            this.active = this.translations[ locale.name ] ? locale.name : locale.neutral;
            this.languageChangedSubject.next( safeLanguage );
            this.statusChangeSubject.next( TranslationChange.event( 'language', 'finish', safeLanguage ) );
            resolve();
          } )
          .catch( (error: Error) => {
            this.statusChangeSubject.next( TranslationChange.event( 'language', 'finish', safeLanguage ) );
            reject( error );
          } );
      }
    } );
  }

  //endregion

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

      if (this.allowedLanguages.indexOf( locale.name ) > -1) {
        return locale.name;
      } else if (locale.hasRegion && this.allowedLanguages.indexOf( locale.neutral ) > -1) {
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
          case 'inline':
            loader = new InlineLoader( this.loaders, this.messenger );
            break;
          case 'json':
          default:
            loader = new JsonLoader( this.http, this.messenger );
            break;
        }
        promises.push( loader.load( language, resource )
          .then( translations => {
            this.storeTranslations(
              language,
              resource,
              resource.type === 'inline' && translations.default
                ? translations.default
                : translations );
          } )
          .catch( error => {
            this.handleError( error );
            this.storeTranslations( language, resource, {} );
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
      this.translations[ language ] = {};
    }
    let target = this.translations[ language ];

    // Check section properties.
    const path: Array<string> = resource.alias.split( '.' );
    if (this.config.filenameToCamelCase) {
      path[ 0 ] = this.toCamelCase( path[ 0 ] );
    }
    for (let i = 0; i < path.length; i++) {
      if (target[ path[ i ] ] === undefined) {
        target[ path[ i ] ] = i === path.length - 1 ? jsonTranslations : {};
      }
      target = target[ path[ i ] ];
    }
  }

  private toCamelCase(
    str: string
  ): string {

    const camel = str.replace( /-./g, c => c.substring( 1 ).toUpperCase() );
    return camel.charAt( 0 ).toLowerCase() + camel.slice( 1 );
  }

  private handleError(
    error: any
  ): void {

    const message = error ?
      (error.message ?? error.toString()) :
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

    // Try the requested (eventually specific) culture (language).
    let translation: string = this.find( locale.name, key );

    // If not found, try neutral culture (language without country/region).
    if (translation === key && locale.hasRegion) {
      translation = this.find( locale.neutral, key );
    }

    // Finally, if not found...
    if (translation === key) {

      // Warning of missing translation code.
      this.messenger.warn( `Missing translation text: [${ locale.name }] ${ key }` );

      // ...try invariant culture (default language)
      locale = new Locale( this.defaultLanguage );
      translation = this.find( locale.name, key );

      // If not found, still try invariant neutral culture.
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

    for (const element of path) {
      if (result) {
        result = result[ element ];
      } else {
        break;
      }
    }
    return result ?? key;
  }

  insert(
    key: string,
    text: string,
    args?: any
  ): string {

    return this.formatter.insert(
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

      // Warning of missing translation code.
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
    for (const element of path) {
      if (result) {
        result = result[ element ];
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

    return this.localizer.number( this.activeLanguage, value, args );
  }

  percent(
    value: number,
    args?: string
  ): string {

    return this.localizer.percent( this.activeLanguage, value, args );
  }

  currency(
    value: CurrencyValue,
    args?: string
  ): string {

    return this.localizer.currency( this.activeLanguage, value, args );
  }

  money(
    value: number,
    currency?: string,
    args?: string
  ): string {

    return this.localizer.money( this.activeLanguage, value, currency, args );
  }

  datetime(
    value: Date | number | string,
    args?: string
  ): string {

    return this.localizer.datetime( this.activeLanguage, value, args );
  }

  custom(
    format: string,
    formatData: FormatData
  ): string {

    return this.extender.interpolate( format, formatData );
  }

  //endregion
}
