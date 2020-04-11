/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';
import { TranslatableSelect } from './translatable-select.model';

export class TranslatableOptionList extends TranslatableSelect {

  constructor(
    readonly translate: TranslationService,
    readonly key: string
  ) {
    super();
    // this.translate = translate;
    // this.key = key;
    this.initialize();
  }

  get selectedValue(): string {
    return this.getSelectedValue();
  }
  set selectedValue( value: string ) {
    this.setSelectedValue( value );
  }
}
