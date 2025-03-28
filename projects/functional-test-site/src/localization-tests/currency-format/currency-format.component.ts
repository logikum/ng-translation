/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from 'ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-currency-format',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './currency-format.component.html',
  styleUrl: './currency-format.component.css'
})
export class CurrencyFormatComponent {

}
