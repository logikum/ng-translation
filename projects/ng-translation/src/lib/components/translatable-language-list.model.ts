/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';
import { TranslatableSelect } from './translatable-select.model';
import { Locale } from '../models';

export class TranslatableLanguageList extends TranslatableSelect {

  private changeInProgress = false;

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

    if (!this.changeInProgress) {
      this.changeInProgress = true;

      if (!this.setSelectedValue( value )) {
        // Language not found -try neutral one.
        const locale = new Locale( value );
        if (locale.hasRegion && this.setSelectedValue( locale.neutral )) {
          // Neutral language found.
          this.translate.changeLanguage( locale.neutral );
        } else {
          this.translate.showError(
            `'${ value }' is not a member of the selectable languages.`
          );
        }
      } else {
        // Language found.
        this.translate.changeLanguage( value );
      }
      this.changeInProgress = false;
    }
  }
}
