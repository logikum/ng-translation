/* 3rd party libraries */
import { Component } from '@angular/core';
import { CurrencyValue } from '@logikum/ngt-common';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

interface Price {
  price: CurrencyValue;
}

@Component({
  selector: 'nts-currency-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './currency-format.component.html',
  styleUrl: './currency-format.component.css'
})
export class CurrencyFormatComponent {

  priceUSD: Price = { price: [ 1234.567, 'USD' ] };
  priceEUR: Price = { price: [ 1234.567, 'EUR' ] };
  priceHUF: Price = { price: [ 1234.567, 'HUF' ] };
  currencyUSD: CurrencyValue = [ 1234.567, 'USD' ];
  currencyEUR: CurrencyValue = [ 1234.567, 'EUR' ];
  currencyHUF: CurrencyValue = [ 1234.567, 'HUF' ];
}
