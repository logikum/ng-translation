/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { Resource, TranslationConverter } from 'ng-translation';

export class CustpmTranslationConverter implements TranslationConverter {

  convert(
    language: string,
    resource: Resource,
    translations: object
  ): object {

    switch (resource.format) {
      case 'po':
        return { };
      default:
        return translations;
    }
  }
}
