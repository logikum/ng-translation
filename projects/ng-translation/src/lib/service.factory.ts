import { HttpClient } from '@angular/common/http';

import { TranslationConfig } from './models';
import { MessengerService, TranslationService, TranspilerService } from './services';

export function serviceFactory(
  http: HttpClient,
  config: TranslationConfig
): TranslationService {

  const messenger = new MessengerService( config );
  return new TranslationService( config, http, messenger, new TranspilerService( messenger ) );
}
