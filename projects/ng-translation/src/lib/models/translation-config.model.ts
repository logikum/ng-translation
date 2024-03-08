/* 3rd party libraries */
import { InjectionToken } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { LoaderType } from '../types';

export interface Section {

  readonly name: string;
  readonly alias?: string;
  readonly path?: string;
  readonly format?: string;
  readonly type?: LoaderType;
}

export interface SectionGroup {

  readonly group: string;
  readonly path?: string;
  readonly format?: string;
  readonly type?: LoaderType;
  readonly items: Array<string | Section>;
}

export type SectionItem = string | Section | SectionGroup;
export type SectionList = Array<SectionItem>;

export interface TranslationConfig {

  readonly translationPath: string;
  readonly translationFormat?: string;
  readonly loaderType?: LoaderType;
  readonly sections: SectionList;
  readonly defaultLanguage: string;
  readonly allowedLanguages?: Array<string>;
  readonly disableWarnings?: boolean;
  readonly currencyDefaultOptions?: object;
  readonly filenameToCamelCase?: boolean;
}

export const NGT_CONFIGURATION = new InjectionToken<TranslationConfig>(
  'NGT_CONFIGURATION'
);
