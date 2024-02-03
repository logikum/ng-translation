/* 3rd party libraries */
import { inject } from '@angular/core';
import { Route } from '@angular/router';

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';

export function loadTranslations(
  route: Route
): Promise<boolean> {

  return inject(TranslationService).initializeModule( route );
}
