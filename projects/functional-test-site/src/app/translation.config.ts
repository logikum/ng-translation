/* 3rd party libraries */
import { SectionList, TranslationConfig } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { environment } from '../environments/environment';
import { seasonSections } from '../seasons/season-sections';

const appSections: SectionList = [
  'app', 'shared', 'enums',
  { group: 'translation', items: [ 'translation' ] },
  { group: 'localization', items: [ 'localization' ] },
  { group: 'localize', items: [ 'localization' ] },
  { group: 'pipe', items: [ 'localization' ] },
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
  { group: 'other', items: [
      'mit-license',
      'other',
      { name: 'spring', type: 'inline' }
    ] },
];

export const translationConfig: TranslationConfig = {
  translationPath: '/i18n/{ language }/{ section }.json',
  // translationPath: '/18n/{section}.{language}.json',
  sections: appSections.concat( seasonSections ),
  defaultLanguage: environment.defaultLanguage,
  allowedLanguages: environment.allowedLanguages,
  formatter: 'ngt',
  defaultCurrency: environment.defaultCurrency,
  disableWarnings: environment.disableWarnings,
  currencyDefaultOptions: { HUF: 'minfd=0;maxfd=0' },
  filenameToCamelCase: true
};
