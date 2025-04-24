/* 3rd party libraries */
import { Directive, inject } from '@angular/core';
import { Locale, TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use a relative path */
import { LocaleOption } from './locale-option.model';

@Directive()
export class NgtLocaleList implements IterableIterator<LocaleOption> {

  private readonly translation = inject(TranslationService);
  private readonly items: Array<LocaleOption> = [];
  private currentIndex = -1;
  private iteratorIndex = 0;
  private changeInProgress = false;

  get selectedIndex(): number {
    return this.currentIndex;
  }

  set selectedIndex( index: number ) {

    let found = false;
    for (let i = 0; i < this.items.length; i++) {
      if (i === index) {
        this.currentIndex = i;
        this.items[ i ].selected = true;
        found = true;
      } else {
        this.items[ i ].selected = false;
      }
    }
    if (!found) {
      this.currentIndex = -1;
    } else {
      const code = this.items[ index ].code;
      if (code !== this.translation.activeLanguage) {
        this.translation.changeLanguage( code );
      }
    }
  }

  get selectedCode(): string {
    return this.getSelectedCode();
  }

  set selectedCode( value: string ) {

    if (!this.changeInProgress) {
      this.changeInProgress = true;

      if (!this.setSelectedCode( value )) {
        // Language not found - try neutral one.
        const locale = new Locale( value );
        if (locale.hasRegion && this.setSelectedCode( locale.neutral )) {
          // Neutral language found.
          this.translation.changeLanguage( locale.neutral );
        } else {
          this.translation.showError(
            `'${ value }' is not a member of the selectable languages.`
          );
        }
      } else {
        // Language found.
        this.translation.changeLanguage( value );
      }
      this.changeInProgress = false;
    }
  }

  get selectedName(): string {
    return this.currentIndex < 0 ? undefined : this.items[ this.currentIndex ].name;
  }

  get selectedItem(): LocaleOption {
    return this.currentIndex < 0 ? undefined : this.items[ this.currentIndex ];
  }

  constructor(
    readonly localeCodes: Array<string>
  ) {
    this.initialize( localeCodes );
  }

  private initialize(
    localeCodes: Array<string>
  ) {

    const currentValue = this.getSelectedCode() || this.translation.activeLanguage;
    localeCodes.forEach( code => {
      // @ts-ignore
      const languageNames = new Intl.DisplayNames([ code ], { type: 'language' });
      const name = languageNames.of( code );
      const selected = code === currentValue;
      this.items.push( { code, name, selected } );
    });
  }

  reset(
    localeCodes: Array<string>,
    activeCode?: string
  ): void {

    const selectedCode = this.getSelectedCode();
    this.currentIndex = -1;
    this.initialize( localeCodes );

    if (!this.setSelectedCode( activeCode )) {
      if (!this.setSelectedCode( selectedCode )) {
        this.selectedIndex = 0;
      }
    }
  }

  next(): IteratorResult<LocaleOption> {

    if (this.iteratorIndex < this.items.length) {
      return {
        value: this.items[ this.iteratorIndex++ ],
        done: false
      };
    } else {
      this.iteratorIndex = 0;
      return { value: undefined, done: true };
    }
  }

  [ Symbol.iterator ](): IterableIterator<LocaleOption> {
    return this;
  }

  private getSelectedCode(): string {
    return this.currentIndex < 0 ? undefined : this.items[ this.currentIndex ].code;
  }

  private setSelectedCode(
    value: string
  ): boolean {

    let found = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[ i ].code === value) {
        this.currentIndex = i;
        this.items[ i ].selected = true;
        found = true;
      } else {
        this.items[ i ].selected = false;
      }
    }
    if (!found) {
      this.currentIndex = -1;
    }
    return found;
  }
}
