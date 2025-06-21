/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'icu-datetime-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './datetime-format.component.html',
  styleUrl: './datetime-format.component.css'
})
export class DatetimeFormatComponent {

  now = { now: Date.now() };
}
