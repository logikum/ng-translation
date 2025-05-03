/* 3rd party libraries */
import {
  ApplicationConfig, importProvidersFrom, provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NGT_FORMAT_EXTENDER, NGT_FORMAT_SERVICE } from '@logikum/ngt-common';
import { NgtFormatterService } from '@logikum/ngt-formatter';
import {
  InlineLoaderMap, NGT_INLINE_LOADER, NGT_TRANSLATION_CONVERTER,
  NgTranslationModule
} from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { routes } from './app.routes';
import { translationConfig } from './translation.config';
import { CustomTranslationConverter } from './custom-translation-converter';
import { CustomFormatExtender } from './custom-format-extender';
import { addInlineLoaders } from './add-inline-loaders';

export function getInlineLoaders(): InlineLoaderMap {

  const loaders: InlineLoaderMap = { };
  addInlineLoaders( loaders, translationConfig );
  return loaders;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection( { eventCoalescing: true } ),
    provideRouter( routes ),
    provideAnimations(),
    importProvidersFrom( NgTranslationModule.forRoot( translationConfig ) ),
    {
      provide: NGT_FORMAT_SERVICE,
      useClass: NgtFormatterService
    }, {
      provide: NGT_INLINE_LOADER,
      useFactory: getInlineLoaders
    }, {
      provide: NGT_TRANSLATION_CONVERTER,
      useClass: CustomTranslationConverter
    }, {
      provide: NGT_FORMAT_EXTENDER,
      useClass: CustomFormatExtender
    }
  ]
};
