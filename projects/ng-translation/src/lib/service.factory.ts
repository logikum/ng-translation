import { HttpClient } from '@angular/common/http';

import { TranslationConfig, TranspileExtender } from './models';
import {
  LocalizationService, MessengerService, TranslationService, TranspilerService
} from './services';

export function serviceFactory(
  http: HttpClient,
  config: TranslationConfig,
  extender: TranspileExtender
): TranslationService {

  const messenger = new MessengerService( config );
  const localization = new LocalizationService( messenger );
  const transpiler = new TranspilerService( localization, messenger );
  return new TranslationService(
    http,
    transpiler,
    messenger,
    config,
    extender
  );
}
