/* 3rd party libraries */
import { SectionList, TranslationConfig } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { environment } from '../environments/environment';
import { seasonSections } from '../seasons/season-sections';

const appSections: SectionList = [
  'app', 'shared', 'enums',
  { group: 'general', items: [ 'general' ] },
  { group: 'seasons', items: [
      'vivaldi', 'spring', 'summer', 'autumn', 'winter'
    ] },
  { group: 'translate', items: [ 'translate' ] },
  { group: 'localize', items: [ 'translate' ] },
  { group: 'pipe', items: [ 'translate' ] },
  { group: 'model', items: [ 'model' ] },
  { group: 'null', items: [ 'null' ] },
  { group: 'conversion', items: [
      'conversion',
      {
        name: 'summer',
        path: '/csv-files/{language}_{section}.csv',
        format: 'csv',
        type: 'text'
      },
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
  defaultCurrency: environment.defaultCurrency,
  disableWarnings: environment.disableWarnings,
  currencyDefaultOptions: { HUF: 'precision-integer' },
  filenameToCamelCase: true
};
