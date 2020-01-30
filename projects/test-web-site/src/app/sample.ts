import { environment } from '../environments/environment';

interface SectionDefinition {
  name: string;
  alias?: string;
  url?: string;
}
type SectionGroup = Array<string | SectionDefinition>;
interface LazyDefinition {
  url: string;
  items: SectionGroup;
}
interface LazySectionList {
  [key: string]: SectionGroup | LazyDefinition;
}
interface SectionList {
  start: SectionGroup;
  lazy?: LazySectionList;
}
interface NgtConfig {
  translationUrl: string;
  sections: SectionList;
  defaultLanguage: string;
  disableWarnings?: boolean;
}

const config: NgtConfig = {
  translationUrl: '/assets/i18n/{ language }/{ section }.json',
  // translationUrl: '/assets/i18n/{section}.{language}.json',
  sections: {
    start: [
      'app',
      { name: 'l10n', url: '/assets/i18n/lib/{ language }/{ section }.json' },
      { name: 'spring', alias: 'tavasz' }
    ],
    lazy: {
      summer: [ 'summer' ],
      autumn: [
        'fall-1',
        { name: 'fall-2', alias: 'fall' }
      ],
      frosty: [ { name: 'winter', alias: 'win', url: '/assets/i18n/v2/{ language }/{ section }.json' } ],
      help: {
        url: '/assets/i18n/help/{ language }/{ section }.json',
        items: [ '' ]
      }
    }
  },
  defaultLanguage: environment.defaultLanguage,
  disableWarnings: environment.disableWarnings
};
