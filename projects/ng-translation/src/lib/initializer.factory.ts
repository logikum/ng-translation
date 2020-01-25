import { TranslationService } from './services';
import { TranslationConfig } from './models';

export function initializerFactory(
  service: TranslationService,
  config: TranslationConfig
): () => void {

  function initializer() {
    service.initializeApp()
      .then( browserLanguageSupported => {
        service.changeLanguage(
          browserLanguageSupported ?
            navigator.language :
            config.defaultLanguage
        );
      } );
  }
  return initializer;
}
