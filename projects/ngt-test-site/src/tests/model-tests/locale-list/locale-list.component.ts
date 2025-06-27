/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';
import { NgtLocaleList } from '@logikum/ngt-models';

/* locally accessible feature module code, always use a relative path */
import { AppService } from '../../../app/app.service';

@Component({
  selector: 'nts-locale-list',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './locale-list.component.html',
  styleUrl: './locale-list.component.css'
})
export class LocaleListComponent {

  private readonly appService = inject( AppService );

  locales = new NgtLocaleList(
    this.appService.translation,
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
