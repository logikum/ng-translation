/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';
import { NgtLocaleList } from '@logikum/ng-translatable';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'icu-locale-list',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './locale-list.component.html',
  styleUrl: './locale-list.component.css'
})
export class LocaleListComponent {

  locales = new NgtLocaleList([ 'en-US', 'hu', 'it', 'pt-BR' ]);

  get selectedLocale(): string {
    return JSON.stringify( this.locales.selectedItem );
  }

  constructor() {
    this.locales.selectedCode = 'hu';
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
