import { TranslationConfig, Section } from 'ng-translation';

import { environment } from '../environments/environment';

export const translationConfig: TranslationConfig = {
  translationPath: '/assets/i18n/{ language }/{ section }.json',
  // translationPath: '/assets/i18n/{section}.{language}.json',
  sections: [
    'app', 'l10n',
    { name: 'spring' },
    { group: 'summer', items: [ 'summer' ] },
    { group: 'autumn', type: 'inline', items: [ 'fall' ] },
    { group: 'frosty', items: [ { name: 'winter' } ] },
    {
      group: 'conversion',
      path: '/assets/po-files/{section}.{language}.po',
      format: 'po',
      type: 'text',
      items: [ { name: 'autumn', alias: 'verse' } ]
    },
    { group: 'winter2', type: 'inline', items: [ 'winter' ] }
  ],
  defaultLanguage: environment.defaultLanguage,
  allowedLanguages: environment.allowedLanguages,
  disableWarnings: environment.disableWarnings,
  currencyDefaultOptions: { HUF: 'minfd=0;maxfd=0' }
};
