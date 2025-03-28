/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-locale-list',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './locale-list.component.html',
  styleUrl: './locale-list.component.css'
})
export class LocaleListComponent {

}
