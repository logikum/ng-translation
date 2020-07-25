/* 3rd party libraries */
import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';

@Injectable( {
  providedIn: 'root'
} )
export class LoadTranslationsGuard implements CanLoad {

  constructor(
    private readonly translationService: TranslationService
  ) { }

  canLoad(
    route: Route
  ): Promise<boolean> {

    return this.translationService.initializeModule( route );
  }
}
