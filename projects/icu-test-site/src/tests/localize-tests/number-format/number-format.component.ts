/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'icu-number-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './number-format.component.html',
  styleUrl: './number-format.component.css'
} )
export class NumberFormatComponent {

  readonly longNumber = 1234567.1234567;
  readonly shortNumber = 1.2;
}
