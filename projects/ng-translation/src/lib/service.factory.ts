import { HttpClient } from '@angular/common/http';

import { TranslationConfig, TranspileExtender } from './models';
import { MessengerService, TranslationService, TranspilerService } from './services';

export function messengerServiceFactory(
  config: TranslationConfig
): MessengerService {

  return new MessengerService( config );
}

export function translationServiceFactory(
  http: HttpClient,
  config: TranslationConfig,
  extender: TranspileExtender
): TranslationService {

  const messenger = new MessengerService( config );
  return new TranslationService(
    http,
    new TranspilerService( messenger ),
    messenger,
    config,
    extender
  );
}
