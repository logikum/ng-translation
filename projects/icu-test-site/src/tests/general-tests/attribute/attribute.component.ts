/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'icu-attribute',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.css'
} )
export class AttributeComponent {

  readonly today = Date.now();
  readonly surge = 0.0206;
  readonly points = 16724.46;
  readonly book = { current: 60, currency1: 'USD', onSale: 48, currency2: 'USD' };
}
