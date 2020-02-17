/* 3rd party libraries */
import { InjectionToken } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { Resource } from './resource.model';

export interface TranslationConverter {

  convert(
    language: string,
    resource: Resource,
    translations: object
  ): object;
}

export const NGT_TRANSLATION_CONVERTER = new InjectionToken<TranslationConverter>(
  'NGT_TRANSLATION_CONVERTER'
);
