/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'icu-percent-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './percent-format.component.html',
  styleUrl: './percent-format.component.css'
} )
export class PercentFormatComponent {

  readonly longPercent = 12.34567;
  readonly shortPercent = .12345;
}
