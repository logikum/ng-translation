/* 3rd party libraries */
import { TranslationConfig } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { TranslationService } from './translation.service';

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
