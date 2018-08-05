import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  private lang = 'en';

  constructor(
    private translationService: TranslationService
  ) { }

  transform(
    value: string,
    args?: any
  ): string {
    return this.translationService.get( this.lang, value, args );
  }
}
