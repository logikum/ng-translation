/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule, TranslationService } from '@logikum/ng-translation';
import { NgtLocaleList } from '@logikum/ngt-models';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'icu-locale-list',
  imports: [ NgTranslationModule ],
  templateUrl: './locale-list.component.html',
  styleUrl: './locale-list.component.css'
} )
export class LocaleListComponent {

  private readonly translation = inject( TranslationService );

  readonly locales = new NgtLocaleList(
    this.translation,
    [ 'en-US', 'hu', 'it', 'pt-BR' ]
  );

  get selectedLocale(): string {
    return JSON.stringify( this.locales.selectedItem );
  }

  changeByCode(
    event: any
  ): void {
    this.locales.selectedCode = event.target.value;
  }

  changeByIndex(
    event: any
  ): void {
    this.locales.selectedIndex = parseInt( event.target.value, 10 );
  }
}
