/* 3rd party libraries */
import {
  ApplicationConfig, importProvidersFrom, provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */
import { routes } from './app.routes';
import { translationConfig } from './translation.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom( NgTranslationModule.forRoot(translationConfig) )
  ]
};
