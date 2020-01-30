import { InjectionToken } from '@angular/core';

export interface TranslationConfig {

  readonly translationUrl: string;
  readonly sections: Array<string>;
  readonly defaultLanguage: string;
  readonly disableWarnings?: boolean;
}

export const NGT_CONFIGURATION = new InjectionToken<TranslationConfig>(
  'NGT_CONFIGURATION'
);
