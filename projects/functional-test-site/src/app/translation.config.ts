/* 3rd party libraries */
import { TranslationConfig} from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */
import { environment } from '../environments/environment';
import { group } from '@angular/animations';

export const translationConfig: TranslationConfig = {
  translationPath: '/i18n/{ language }/{ section }.json',
  // translationPath: '/18n/{section}.{language}.json',
  sections: [
    'app',
    { group: 'component', items: [ 'component' ] },
    { group: 'translation', items: [ 'translation' ] },
    { group: 'localization', items: [ 'localization' ] },
    { group: 'conversion', items: [ 'conversion' ] },
    { group: 'null', items: [ 'null' ] },
    { group: 'other', items: [ 'other' ] },
    // { group: 'winter2', type: 'inline', items: [ 'winter' ] }
  ],
  defaultLanguage: environment.defaultLanguage,
  allowedLanguages: environment.allowedLanguages,
  disableWarnings: environment.disableWarnings,
  currencyDefaultOptions: { HUF: 'minfd=0;maxfd=0' },
  filenameToCamelCase: true
};
