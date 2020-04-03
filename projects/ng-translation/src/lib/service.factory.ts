/* 3rd party libraries */
import { HttpClient } from '@angular/common/http';

/* locally accessible feature module code, always use relative path */
import {
  TranslationConfig, TranslationConverter, TranspileExtender
} from './models';
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
  converter: TranslationConverter,
  extender: TranspileExtender
): TranslationService {

  return new TranslationService(
    http, transpiler, messenger, config, converter, extender
  );
}
