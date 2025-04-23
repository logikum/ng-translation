/* 3rd party libraries */
import { InlineLoaderMap, getInlineItems, TranslationConfig } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

export function addInlineLoaders(
  loaders: InlineLoaderMap,
  config: TranslationConfig
): void {

  const sections = getInlineItems( config );
  sections.forEach( section => {
    switch (section) {
      case 'spring':
        loaders[ section ] = ( lang: string, name: string ) => {
          switch (lang) {
            case 'en':
            case 'hu':
            case 'it':
              return import( `./i18n/${ name }.${ lang }.json` );
            default:
              throw new Error( `Missing i18n/${ name }.${ lang }.json file.` );
          }
        };
        break;
    }
  } );
}
