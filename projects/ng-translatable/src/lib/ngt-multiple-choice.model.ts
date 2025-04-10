/* 3rd party libraries */
import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '@logikum/ng-translation';

/* locally accessible feature module code, always use relative path */
import { TranslatableOption } from './translatable-option.model';

@Directive()
export class NgtMultipleChoice implements IterableIterator<TranslatableOption> {

  private readonly translation = inject(TranslationService);
  private readonly items: Array<TranslatableOption> = [];
  private iteratorIndex = 0;
  private filter = ( value: string, text: string ): boolean => {
    return true;
  }

  get selectedCount(): number {
    return this.items
      .filter( item => item.selected )
      .length;
  }

  get selectedIndexes(): Array<number> {
    return this.items
      .map( ( item, index ) => item.selected ? index : -1 )
      .filter( item => item > -1 );
  }

  set selectedIndexes( indexes: Array<number> ) {
    if (indexes) {
      for ( let i = 0; i < this.items.length; i++ ) {
        this.items[i].selected = indexes.includes( i );
      }
    }
  }

  get selectedValues(): Array<string> {
    return this.items
      .filter( item => item.selected )
      .map( item => item.value );
  }

  set selectedValues(
    values: Array<string>
  ) {
    if (values) {
      this.items.forEach( item => {
        item.selected = values.includes( item.value );
      });
    }
  }

  get selectedTexts(): Array<string> {
    return this.items
      .filter( item => item.selected )
      .map( item => item.text );
  }

  get selectedItems(): Array<TranslatableOption> {
    return this.items.filter( item => item.selected );
  }

  constructor(
    private readonly key: string,
    filter?: ( value: string, text: string ) => boolean
  ) {
    this.translation.languageChanged
      // @ts-ignore
      .pipe( takeUntilDestroyed() )
      .subscribe( language => {
        this.getItems();
      } );
    if (filter) {
      this.filter = filter;
    }
    this.getItems();
  }

  detectChanges(): void {
    this.getItems();
  }

  private getItems(): void {

    const currentValues = this.selectedValues;
    this.selectedIndexes = [ ];
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
            const selected = currentValues.includes( value );
            this.items.push( { value, text, selected } );
          }
        }
      }
    }
  }

  setState(
    value: string,
    selected: boolean
  ): void {

    const match = this.items.find( item => item.value === value );
    if (match) {
      match.selected = selected;
    }
  }

  selectAll(): void {

    this.items.forEach( item => {
      item.selected = true;
    } );
  }

  deselectAll(): void {

    this.items.forEach( item => {
      item.selected = false;
    } );
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
}
