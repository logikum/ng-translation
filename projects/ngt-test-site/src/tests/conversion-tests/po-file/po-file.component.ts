/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'nts-po-file',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './po-file.component.html',
  styleUrl: './po-file.component.css'
} )
export class PoFileComponent {

}
