/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-translation-string',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './translation-string.component.html',
  styleUrl: './translation-string.component.css'
})
export class TranslationStringComponent {

}
