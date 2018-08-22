import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoadTranslationsGuard implements CanLoad {

  constructor(
    private translationService: TranslationService
  ) { }

  canLoad(
    route: Route
  ): Promise<boolean> {

    return this.translationService.initializeSection( route );
  }
}