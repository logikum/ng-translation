/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';
import { TranslatableSelect } from './translatable-select.model';

export class TranslatableOptionList extends TranslatableSelect {

  constructor(
    protected readonly translate: TranslationService,
    protected readonly key: string
  ) {
    super();
    this.initialize();
  }

  get selectedValue(): string {
    return this.getSelectedValue();
  }
  set selectedValue( value: string ) {
    this.setSelectedValue( value );
  }
}
