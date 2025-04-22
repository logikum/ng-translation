/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-to-datetime',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './to-datetime.component.html',
  styleUrl: './to-datetime.component.css'
})
export class ToDatetimeComponent {

  now = Date.now();
}
