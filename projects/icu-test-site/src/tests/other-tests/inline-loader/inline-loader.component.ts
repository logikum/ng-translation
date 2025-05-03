/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'icu-inline-loader',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './inline-loader.component.html',
  styleUrl: './inline-loader.component.css'
})
export class InlineLoaderComponent {

}
