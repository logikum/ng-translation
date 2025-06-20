/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'icu-reader',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.css'
} )
export class ReaderComponent {

  today = { today: Date.now() };
  stock = { surge: 0.0206, points: 16724.46 };
  book = { current: 60, currency1: 'USD', onSale: 48, currency2: 'USD' };
}
