import { Component } from '@angular/core';

import { CurrencyValue } from 'ng-translation';

interface Price {
  price: CurrencyValue;
}
type Currency = Array<CurrencyValue>;

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.css']
})
export class LocalizationComponent {

  longNumber = 1234567.1234567;
  shortNumber = 1.2;
  longPercent = 12.34567;
  shortPercent = .12345;
  priceU: Price = { price: [ 1234.567, 'USD' ] };
  priceE: Price = { price: [ 1234.567, 'EUR' ] };
  priceF: Price = { price: [ 1234.567, 'HUF' ] };
  currencyU: Currency = [[ 1234.567, 'USD' ]];
  currencyE: Currency = [[ 1234.567, 'EUR' ]];
  currencyF: Currency = [[ 1234.567, 'HUF' ]];
  now = Date.now();
}
