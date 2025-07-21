/* 3rd party libraries */
import {
  ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection
} from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';
import { provideRouter } from '@angular/router';

/* locally accessible feature module code, always use a relative path */
import { routes } from './app.routes';
import { notFoundInterceptor } from './interceptors/not-found.interceptor';
import { CustomElementsService } from '../components-in-markdown/custom-elements.service';

function initializeCustomElements(
  customElementsService: CustomElementsService
): void {
  customElementsService.setupCustomElements();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([ notFoundInterceptor ]),
    ),
    provideAppInitializer(() => initializeCustomElements( inject(CustomElementsService) ))
  ]
};
