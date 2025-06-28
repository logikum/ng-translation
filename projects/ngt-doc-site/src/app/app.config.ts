/* 3rd party libraries */
import {
  ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

/* locally accessible feature module code, always use a relative path */
import { routes } from './app.routes';
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
    provideHttpClient(withFetch()),
    provideAppInitializer(() => initializeCustomElements( inject(CustomElementsService) ))
  ]
};
