/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';
import { TranslatableSelect } from './translatable-select.model';
import { Locale } from './locale.model';

export class TranslatableLanguageList extends TranslatableSelect {

  private changeInProgress = false;

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
