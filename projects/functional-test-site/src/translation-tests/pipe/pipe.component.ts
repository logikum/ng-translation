/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-pipe',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.css'
})
export class PipeComponent {

}
