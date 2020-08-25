import { Component } from '@angular/core';

import { CurrencyValue, TranslationService } from 'ng-translation';

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

  constructor(
    private readonly translation: TranslationService
  ) { }

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
  ccyValue = 1234.567;
  ccyCurr = 'HUF';
  now = Date.now();

  get getNumber(): string { return this.translation.number( this.longNumber, 'maxfd=2' ); }
  get getPercent(): string { return this.translation.percent( this.shortPercent, 'minfd=1' ); }
  get getCurrency(): string { return this.translation.currency( this.priceE.price ); }
  get getCcy(): string { return this.translation.ccy( this.ccyValue, this.ccyCurr ); }
  get getDatetime(): string { return this.translation.datetime( this.now, 'ds=medium;ts=medium' ); }
}
