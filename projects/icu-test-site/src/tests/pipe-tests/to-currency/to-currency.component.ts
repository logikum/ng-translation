/* 3rd party libraries */
import { Component } from '@angular/core';
import { CurrencyValue } from '@logikum/ngt-common';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'icu-to-currency',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './to-currency.component.html',
  styleUrl: './to-currency.component.css'
} )
export class ToCurrencyComponent {

  readonly currencyUSD: CurrencyValue = [ 1234.567, 'USD' ];
  readonly currencyEUR: CurrencyValue = [ 1234.567, 'EUR' ];
  readonly currencyHUF: CurrencyValue = [ 1234.567, 'HUF' ];
}
