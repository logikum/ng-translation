/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'nts-currency-codes',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './currency-codes.component.html',
  styleUrl: './currency-codes.component.css'
} )
export class CurrencyCodesComponent {

}
