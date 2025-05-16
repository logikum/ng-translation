/* 3rd party libraries */
import { Component } from '@angular/core';
import { CurrencyValue } from '@logikum/ngt-common';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

interface Price {
  price: number;
  currency: string;
}

@Component({
  selector: 'icu-currency-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './currency-format.component.html',
  styleUrl: './currency-format.component.css'
})
export class CurrencyFormatComponent {

  priceUSD: Price = { price: 1234.567, currency: 'USD' };
  priceEUR: Price = { price: 1234.567, currency: 'EUR' };
  priceHUF: Price = { price: 1234.567, currency: 'HUF' };
}
