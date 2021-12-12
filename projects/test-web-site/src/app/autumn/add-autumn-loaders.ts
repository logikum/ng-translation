import { InlineLoaderMap } from 'ng-translation';
import { getModuleItems, TranslationConfig } from 'ng-translation';

export function addAutumnLoaders(
  loaders: InlineLoaderMap,
  config: TranslationConfig
): void {

  const translations = getModuleItems( config, 'autumn' );
  translations.forEach( resource => {
    loaders[ resource ] = ( lang: string, name: string ) => {
      switch (lang) {
        case 'en':
        case 'hu':
        case 'it':
          return import( `./i18n/${ name }.${ lang }.json` );
        default:
          throw new Error( `Missing i18n/${ name }.${ lang }.json file.` );
      }
    };
  } );
}
