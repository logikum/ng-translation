/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-attribute',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.css'
})
export class AttributeComponent {

}
