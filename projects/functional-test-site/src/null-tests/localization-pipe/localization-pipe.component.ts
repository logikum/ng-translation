/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-localization-pipe',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './localization-pipe.component.html',
  styleUrl: './localization-pipe.component.css'
})
export class LocalizationPipeComponent {

}
