/* 3rd party libraries */
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */
import { DestroyRef, inject } from '@angular/core';
import { TranslatableOption } from './translatable-option.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class NgtSingleChoice {

  private destroyRef = inject(DestroyRef);
  private readonly translation = inject(TranslationService);
  private readonly items: Array<TranslatableOption> = [];
  private currentIndex = -1;
  private iteratorIndex = 0;
  protected filter = ( value: string, text: string ): boolean => {
    return true;
  }

  get selectedIndex(): number {
    return this.currentIndex;
  }

  set selectedIndex( index: number ) {

    const ix = Math.round( index );
    this.currentIndex = -1 < ix && ix < this.items.length ? ix : -1;
    for (let i = 0; i < this.items.length; i++) {
      this.items[ i ].selected = i === this.currentIndex;
    }
  }

  get selectedValue(): string {
    return this.currentIndex < 0 ? undefined : this.items[ this.currentIndex ].value;
  }

  set selectedValue( value: string ) {

    this.currentIndex = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[ i ].value === value) {
        this.items[ i ].selected = true;
        this.currentIndex = i;
      }
    }
  }

  get selectedText(): string {
    return this.currentIndex < 0 ? undefined : this.items[ this.currentIndex ].text;
  }

  get selectedItem(): TranslatableOption {
    return this.currentIndex < 0 ? undefined : this.items[ this.currentIndex ];
  }

  constructor(
    private readonly key: string,
    filter?: ( value: string, text: string ) => boolean
  ) {
    if (filter) {
      this.filter = filter;
    }
    this.initialize();
  }

  protected initialize() {

    this.translation.languageChanged
      // @ts-ignore
      .pipe( takeUntilDestroyed( this.destroyRef ) )
      .subscribe( language => {
        this.getItems();
      } );
    this.getItems();
  }

  detectChanges(): void {
    this.getItems();
  }

  private getItems(): void {

    const currentValue = this.selectedValue;
    this.currentIndex = -1;
    this.items.length = 0;

    const optionGroup = this.translation.getGroup( this.key );
    if (optionGroup) {
      const optionValues = Object.getOwnPropertyNames( optionGroup );

      if (optionValues.length) {
        let itemIndex = -1;

        for (let i = 0; i < optionValues.length; i++) {
          const value = optionValues[ i ];
          const text = optionGroup[ value ];
          if (this.filter( value, text )) {
            itemIndex++;
            const selected = value === currentValue;
            this.items.push( { value, text, selected } );
            if (selected) {
              this.currentIndex = itemIndex;
            }
          }
        }
        if (this.currentIndex < 0 && this.items.length) {
          this.currentIndex = 0;
        }
      }
    }
  }

  next(): IteratorResult<TranslatableOption> {

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

  [ Symbol.iterator ](): IterableIterator<TranslatableOption> {
    return this;
  }

  protected getSelectedValue(): string {
    return this.currentIndex < 0 ? undefined : this.items[ this.currentIndex ].value;
  }

  protected setSelectedValue(
    value: string
  ): boolean {
    let found = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[ i ].value === value) {
        this.currentIndex = i;
        this.items[ i ].selected = true;
        found = true;
      } else {
        this.items[ i ].selected = false;
      }
    }
    return found;
  }
}
