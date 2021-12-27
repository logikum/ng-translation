/* 3rd party libraries */

/* globally accessible app code in every feature module */
import { Locale, TranslationService } from 'ng-translation';

/* locally accessible feature module code, always use relative path */
import { TranslatableSelect } from './translatable-select.model';

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