/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'fts-camel-case',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './camel-case.component.html',
  styleUrl: './camel-case.component.css'
})
export class CamelCaseComponent {

}
