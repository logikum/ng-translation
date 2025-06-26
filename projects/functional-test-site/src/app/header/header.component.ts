/* 3rd party libraries */
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { NgTranslationModule  } from '@logikum/ng-translation';
import { NgtLocaleList } from '@logikum/ng-translatable';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../app.service';
import { translationConfig } from '../translation.config';

@Component({
  selector: 'fts-header',
  imports: [ RouterLink, NgTranslationModule, AsyncPipe ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {

  private readonly appService = inject( AppService );

  locales: NgtLocaleList;

  get isInitialized(): Observable<boolean> {
    return this.appService.translation.isInitialized;
  }

  constructor() {

    const languages = [ ...translationConfig.allowedLanguages ];
    languages.push( 'hi' ); // not allowed language, it should not be displayed
    this.locales = new NgtLocaleList(
      this.appService.translation,
      languages
    );
  }

  changeLanguage(
    event: any
  ): void {
    this.locales.selectedCode = event.target.value;
  }
}
