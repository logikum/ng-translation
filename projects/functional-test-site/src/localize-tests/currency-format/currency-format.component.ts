/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule, CurrencyValue } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

interface Price {
  price: CurrencyValue;
}

@Component({
  selector: 'fts-currency-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './currency-format.component.html',
  styleUrl: './currency-format.component.css'
})
export class CurrencyFormatComponent {

  currencyUSD: CurrencyValue = [ 1234.567, 'USD' ];
  currencyEUR: CurrencyValue = [ 1234.567, 'EUR' ];
  currencyHUF: CurrencyValue = [ 1234.567, 'HUF' ];
}
