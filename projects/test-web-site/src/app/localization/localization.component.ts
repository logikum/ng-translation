import { Component } from '@angular/core';

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
  priceU = { price: [ 1234.567, 'USD' ] };
  priceE = { price: [ 1234.567, 'EUR' ] };
  priceF = { price: [ 1234.567, 'HUF' ] };
  currencyU = [[ 1234.567, 'USD' ]];
  currencyE = [[ 1234.567, 'EUR' ]];
  currencyF = [[ 1234.567, 'HUF' ]];
  now = Date.now();
}
