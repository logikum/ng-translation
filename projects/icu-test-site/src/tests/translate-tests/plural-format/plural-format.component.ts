/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'icu-plural-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './plural-format.component.html',
  styleUrl: './plural-format.component.css'
} )
export class PluralFormatComponent {

  readonly count_0 = { count: 0 };
  readonly count_1 = { count: 1 };
  readonly count_5 = { count: 5 };
  readonly count_1973 = { count: 1973 };
}
