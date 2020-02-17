/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { Resource, TranslationConverter } from './models';

export class DefaultTranslationConverter implements TranslationConverter {

  convert(
    language: string,
    resource: Resource,
    translations: object
  ): object {

    return translations;
  }
}
