/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-html',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './html.component.html',
  styleUrl: './html.component.css'
})
export class HtmlComponent {

}
