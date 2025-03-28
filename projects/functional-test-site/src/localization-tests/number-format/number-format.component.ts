/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-number-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './number-format.component.html',
  styleUrl: './number-format.component.css'
})
export class NumberFormatComponent {

}
