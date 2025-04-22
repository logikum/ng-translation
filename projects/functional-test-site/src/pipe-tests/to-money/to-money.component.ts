/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */

@Component({
  selector: 'fts-to-money',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './to-money.component.html',
  styleUrl: './to-money.component.css'
})
export class ToMoneyComponent {

  amount = 1234.567;
}
