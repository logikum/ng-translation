import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';

import { TranslationService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class LoadTranslationsGuard implements CanLoad {

  constructor(
    private translationService: TranslationService
  ) { }

  canLoad(
    route: Route
  ): Promise<boolean> {

    return this.translationService.initializeSection( route );
  }
}
