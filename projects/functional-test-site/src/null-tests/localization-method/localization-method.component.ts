/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-localization-method',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './localization-method.component.html',
  styleUrl: './localization-method.component.css'
})
export class LocalizationMethodComponent {

}
