/* 3rd party libraries */
// import { TranslationService } from '@logikum/ng-translation';

/* globally accessible app code in every feature module */
import { TranslationService } from 'ng-translation';

/* locally accessible feature module code, always use relative path */
import { TranslatableSelect } from './translatable-select.model';

export class TranslatableOptionList extends TranslatableSelect {

  constructor(
    protected readonly translate: TranslationService,
    protected readonly key: string,
    filter?: ( value: string, text: string ) => boolean
  ) {
    super();
    if (filter) {
      this.filter = filter;
    }
    this.initialize();
  }

  get selectedValue(): string {
    return this.getSelectedValue();
  }

  set selectedValue( value: string ) {
    this.setSelectedValue( value );
  }
}
