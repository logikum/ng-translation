import { Pipe, PipeTransform } from '@angular/core';

import { FormatData } from '../models';
import { LocalizationService, TranslationService } from '../services';

@Pipe({
  name: 'toPercent'
})
export class ToPercentPipe implements PipeTransform {

  constructor(
    private readonly translation: TranslationService,
    private readonly localization: LocalizationService
  ) { }

  transform(
    value: number,
    args?: string
  ): string {

    const fdata: FormatData = {
      key: undefined,
      locale: this.translation.activeLanguage,
      params: args || '',
      value: value
    };
    return this.localization.percentFormat( fdata );
  }
}
