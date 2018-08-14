import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform  {

  constructor(
    private translation: TranslationService
  ) { }

  transform(
    value: string,
    args?: any
  ): any {

    return this.translation.get( value, args );
  }
}
