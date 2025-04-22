/* 3rd party libraries */
import { TranslationConfig} from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */
import { environment } from '../environments/environment';

export const translationConfig: TranslationConfig = {
  translationPath: '/i18n/{ language }/{ section }.json',
  // translationPath: '/18n/{section}.{language}.json',
  sections: [
    'app', 'shared', 'enums',
    { group: 'translation', items: [ 'translation' ] },
    { group: 'localization', items: [ 'localization' ] },
    { group: 'localize', items: [ 'localization' ] },
    { group: 'model', items: [ 'model' ] },
    { group: 'null', items: [ 'null' ] },
    { group: 'conversion', items: [
      'conversion',
      {
        name: 'autumn',
        alias: 'fall',
        path: '/po-files/{section}.{language}.po',
        format: 'po',
        type: 'text'
      }
    ] },
    { group: 'other', items: [ 'mit-license', 'other' ] },
  ],
  defaultLanguage: environment.defaultLanguage,
  allowedLanguages: environment.allowedLanguages,
  defaultCurrency: environment.defaultCurrency,
  disableWarnings: environment.disableWarnings,
  currencyDefaultOptions: { HUF: 'minfd=0;maxfd=0' },
  filenameToCamelCase: true
};
