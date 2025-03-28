/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-plural-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './plural-format.component.html',
  styleUrl: './plural-format.component.css'
})
export class PluralFormatComponent {

}
