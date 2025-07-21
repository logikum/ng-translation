/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'nts-to-number',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './to-number.component.html',
  styleUrl: './to-number.component.css'
} )
export class ToNumberComponent {

  readonly longNumber = 1234567.1234567;
  readonly shortNumber = 1.2;
}
