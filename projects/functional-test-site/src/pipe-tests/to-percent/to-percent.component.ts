/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-to-percent',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './to-percent.component.html',
  styleUrl: './to-percent.component.css'
})
export class ToPercentComponent {

  longPercent = 12.34567;
  shortPercent = .12345;
}
