/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'nts-translation-string',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './translation-string.component.html',
  styleUrl: './translation-string.component.css'
})
export class TranslationStringComponent {

  get today(): Date { return new Date(); }
}
