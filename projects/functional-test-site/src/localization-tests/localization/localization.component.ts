/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-localization',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './localization.component.html',
  styleUrl: './localization.component.css'
})
export class LocalizationComponent {

}
