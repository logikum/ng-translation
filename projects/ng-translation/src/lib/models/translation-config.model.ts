/* 3rd party libraries */
import { InjectionToken } from '@angular/core';

/* locally accessible feature module code, always use relative path */

export interface Section {

  name: string;
  alias?: string;
  url?: string;
  format?: string;
  type?: 'json' | 'text';
}

export interface SectionGroup {

  group: string;
  url?: string;
  format?: string;
  type?: 'json' | 'text';
  items: Array<string | Section>;
}

export type SectionItem = string | Section | SectionGroup;
export type SectionList = Array<SectionItem>;

export interface TranslationConfig {

  readonly translationUrl: string;
  readonly translationFormat?: string;
  readonly sections: SectionList;
  readonly defaultLanguage: string;
  readonly disableWarnings?: boolean;
}

export const NGT_CONFIGURATION = new InjectionToken<TranslationConfig>(
  'NGT_CONFIGURATION'
);
