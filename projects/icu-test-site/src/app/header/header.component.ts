/* 3rd party libraries */
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { NgTranslationModule, TranslationService } from '@logikum/ng-translation';
import { NgtLocaleList } from '@logikum/ngt-models';

/* locally accessible feature module code, always use a relative path */
import { translationConfig } from '../translation.config';

@Component( {
  selector: 'icu-header',
  imports: [ RouterLink, NgTranslationModule, AsyncPipe ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
} )
export class HeaderComponent {

  private readonly translation = inject( TranslationService );

  readonly locales: NgtLocaleList;

  get isInitialized(): Observable<boolean> {
    return this.translation.isInitialized;
  }

  constructor() {

    const languages = [ ...translationConfig.allowedLanguages ];
    languages.push( 'hi' ); // not allowed language, it should not be displayed
    this.locales = new NgtLocaleList(
      this.translation,
      languages
    );
  }

  changeLanguage(
    event: any
  ): void {
    this.locales.selectedCode = event.target.value;
  }
}
