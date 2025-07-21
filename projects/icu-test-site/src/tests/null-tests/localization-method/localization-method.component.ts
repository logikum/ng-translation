/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'icu-localization-method',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './localization-method.component.html',
  styleUrl: './localization-method.component.css'
} )
export class LocalizationMethodComponent {

  get today(): Date {
    return new Date();
  }
}
