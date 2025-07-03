/* 3rd party libraries */
import { Component, inject } from '@angular/core';
import { CurrencyValue } from '@logikum/ngt-common';
import { NgTranslationModule, TranslationService } from '@logikum/ng-translation';
import { IReaderGeneralText } from '../../../if-reader/i-reader-general';

/* locally accessible feature module code, always use a relative path */

@Component({
  selector: 'nts-reader',
  imports: [
    NgTranslationModule
  ],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.css'
})
export class ReaderComponent {

  private readonly translation = inject( TranslationService );

  b = this.translation.getBranch<IReaderGeneralText>('general.text');

  get today(): Date { return new Date(); }
  get rise(): number { return 0.0206; }
  get value(): number { return 16724.46; }
  get normalPrice(): CurrencyValue { return [60, 'USD']; }
  get specialPrice(): CurrencyValue { return [48, 'USD']; }
}
