/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-single-choice',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './single-choice.component.html',
  styleUrl: './single-choice.component.css'
})
export class SingleChoiceComponent {

}
