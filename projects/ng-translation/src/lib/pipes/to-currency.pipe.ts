import { Pipe, PipeTransform } from '@angular/core';

import { FormatData } from '../models';
import { LocalizationService, TranslationService } from '../services';

@Pipe({
  name: 'toCurrency'
})
export class ToCurrencyPipe implements PipeTransform {

  constructor(
    private readonly translation: TranslationService,
    private readonly localization: LocalizationService
  ) { }

  transform(
    value: any,
    args?: string
  ): any {

    const fdata: FormatData = {
      key: undefined,
      locale: this.translation.activeLanguage,
      params: args || '',
      value: value
    };

    return this.localization.currencyFormat( fdata );
  }
}
