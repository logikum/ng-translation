/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'icu-money-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './money-format.component.html',
  styleUrl: './money-format.component.css'
})
export class MoneyFormatComponent {

  amount = 1234.567;
}
