/* 3rd party libraries */
import { Component } from '@angular/core';
import { CurrencyValue } from '@logikum/ngt-common';
import { NgTranslationModule } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'nts-pipe',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.css'
})
export class PipeComponent {

  get today(): Date { return new Date(); }
  get rise(): number { return 0.0206; }
  get value(): number { return 16724.46; }
  get normalPrice(): CurrencyValue { return [60, 'USD']; }
  get specialPrice(): CurrencyValue { return [48, 'USD']; }
}
