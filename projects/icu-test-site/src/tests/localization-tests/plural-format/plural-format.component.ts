/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'icu-plural-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './plural-format.component.html',
  styleUrl: './plural-format.component.css'
})
export class PluralFormatComponent {

}
