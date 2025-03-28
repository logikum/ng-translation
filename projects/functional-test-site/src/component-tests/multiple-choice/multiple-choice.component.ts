/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-multiple-choice',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.css'
})
export class MultipleChoiceComponent {

}
