/* 3rd party libraries */
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { NgTranslationModule, TranslationService  } from '@logikum/ng-translation';
import { NgtLocaleList } from '@logikum/ng-translatable';

/* locally accessible feature module code, always use relative path */

import { translationConfig } from '../translation.config';

@Component({
  selector: 'fun-header',
  imports: [ RouterLink, NgTranslationModule, AsyncPipe ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {

  private translation = inject(TranslationService);

  locales = new NgtLocaleList( translationConfig.allowedLanguages );

  get isInitialized(): Observable<boolean> {
    return this.translation.isInitialized;
  }

  changeLanguage(
    event: any
  ): void {
    this.locales.selectedCode = event.target.value;
  }
}
