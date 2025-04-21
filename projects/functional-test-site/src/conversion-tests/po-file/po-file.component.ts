/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-po-file',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './po-file.component.html',
  styleUrl: './po-file.component.css'
})
export class PoFileComponent {

}
