import { InjectionToken } from '@angular/core';

export interface Section {

  name: string;
  alias?: string;
  url?: string;
  format?: string;
}

export interface SectionGroup {

  group: string;
  url?: string;
  format?: string;
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
