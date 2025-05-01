/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule, CurrencyValue } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'fts-to-currency',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './to-currency.component.html',
  styleUrl: './to-currency.component.css'
})
export class ToCurrencyComponent {

  currencyUSD: CurrencyValue = [ 1234.567, 'USD' ];
  currencyEUR: CurrencyValue = [ 1234.567, 'EUR' ];
  currencyHUF: CurrencyValue = [ 1234.567, 'HUF' ];
}
