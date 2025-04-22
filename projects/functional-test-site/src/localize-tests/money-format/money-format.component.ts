/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule, CurrencyValue } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-money-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './money-format.component.html',
  styleUrl: './money-format.component.css'
})
export class MoneyFormatComponent {

  amount = 1234.567;
}
