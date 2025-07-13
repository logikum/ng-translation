/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component( {
  selector: 'nts-csv-file',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './csv-file.component.html',
  styleUrl: './csv-file.component.css'
} )
export class CsvFileComponent {

}
