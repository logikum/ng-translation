/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-text-list',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './text-list.component.html',
  styleUrl: './text-list.component.css'
})
export class TextListComponent {

}
