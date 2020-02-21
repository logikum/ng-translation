/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';
import { TranslatableSelect } from './translatable-select.model';
import { Locale } from './locale.model';

export class TranslatableLanguageList extends TranslatableSelect {

  constructor(
    readonly translate: TranslationService,
    readonly key: string
  ) {
    super();
    this.translate = translate;
    this.key = key;
    this.initialize();
  }

  get selectedValue(): string {
    return this.getSelectedValue();
  }
  set selectedValue( value: string ) {
    if (!this.setSelectedValue( value )) {
      const locale = new Locale( value );
      if (locale.hasRegion) {
        this.setSelectedValue( locale.neutral );
      }
    }
  }
}
