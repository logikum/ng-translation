import { InjectionToken } from '@angular/core';

export interface TranslationConfig {

  translationUrl: string;
  sections: Array<string>;
  defaultLanguage: string;
  disableWarnings?: boolean;
}

export const TRANSLATION_CONFIG = new InjectionToken<TranslationConfig>(
  'TRANSLATION_CONFIG'
);
