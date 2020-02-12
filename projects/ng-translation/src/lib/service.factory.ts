import { HttpClient } from '@angular/common/http';

import { TranslationConfig, TranspileExtender } from './models';
import {
  LocalizationService, MessengerService, TranslationService, TranspilerService
} from './services';

export function messengerServiceFactory(
  config: TranslationConfig
): MessengerService {

  return new MessengerService();
}

export function localizationServiceFactory(
  messenger: MessengerService
): LocalizationService {

  return new LocalizationService( messenger );
}

export function transpilerServiceFactory(
  localization: LocalizationService,
  messenger: MessengerService
): TranspilerService {

  return new TranspilerService( localization, messenger );
}

export function translationServiceFactory(
  http: HttpClient,
  transpiler: TranspilerService,
  messenger: MessengerService,
  config: TranslationConfig,
  extender: TranspileExtender
): TranslationService {

  return new TranslationService( http, transpiler, messenger, config, extender );
}
