/* 3rd party libraries */
import { Component } from '@angular/core';
import { NgTranslationModule, CurrencyValue } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'fts-structural',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './structural.component.html',
  styleUrl: './structural.component.css'
})
export class StructuralComponent {

  get today(): Date { return new Date(); }
  get rise(): number { return 0.0206; }
  get value(): number { return 16724.46; }
  get normalPrice(): CurrencyValue { return [60, 'USD']; }
  get specialPrice(): CurrencyValue { return [48, 'USD']; }
}
