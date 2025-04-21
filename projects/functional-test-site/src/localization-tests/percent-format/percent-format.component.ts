/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-percent-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './percent-format.component.html',
  styleUrl: './percent-format.component.css'
})
export class PercentFormatComponent {

  longPercent = 12.34567;
  shortPercent = .12345;
}
