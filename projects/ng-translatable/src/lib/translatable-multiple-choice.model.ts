/* 3rd party libraries */
import { Directive, OnDestroy } from '@angular/core';
// import { TranslationService } from '@logikum/ng-translation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* globally accessible app code in every feature module */
import { TranslationService } from 'ng-translation';

/* locally accessible feature module code, always use relative path */
import { TranslatableOption } from './translatable-option.model';

@Directive()
export class TranslatableMultipleChoice implements IterableIterator<TranslatableOption>, OnDestroy {

  private readonly onDestroy: Subject<void> = new Subject();
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

  get selectedIndeces(): Array<number> {
    return this.items
      .map( ( item, index ) => item.selected ? index : -1 )
      .filter( item => item > -1 );
  }

  set selectedIndeces( indeces: Array<number> ) {
    this.items.forEach( item => {
      item.selected = false;
    } );
    if (indeces) {
      indeces.forEach( index => {
        if (-1 < index && index < this.items.length) {
          this.items[ index ].selected = true;
        }
      } );
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
    this.items.forEach( item => {
      item.selected = false;
    } );
    if (values) {
      values.forEach( value => {
        const match = this.items.find( item => item.value === value );
        if (match) {
          match.selected = true;
        }
      } );
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
    private readonly translate: TranslationService,
    private readonly key: string,
    filter?: ( value: string, text: string ) => boolean
  ) {
    this.translate.languageChanged
      .pipe( takeUntil( this.onDestroy ) )
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
    this.selectedIndeces = [ ];
    this.items.length = 0;

    const optionGroup = this.translate.getGroup( this.key );
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
