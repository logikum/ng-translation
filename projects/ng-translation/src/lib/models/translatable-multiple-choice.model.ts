/* 3rd party libraries */
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* locally accessible feature module code, always use relative path */
import { TranslatableOption } from './translatable-option.model';
import { TranslationService } from '../services';

export class TranslatableMultipleChoice implements IterableIterator<TranslatableOption>, OnDestroy {

  private readonly onDestroy: Subject<void> = new Subject();
  private readonly items: Array<TranslatableOption> = [];
  private iteratorIndex = 0;

  get selectedIndeces(): Array<number> {
    return this.items
      .map( (item, index) => item.selected ? index : -1 )
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
  get selectedTexts(): Array<string> {
    return this.items
      .filter( item => item.selected )
      .map( item => item.text );
  }
  get selectedItems(): Array<TranslatableOption> {
    return this.items.filter( item => item.selected );
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

  constructor(
    private readonly translate: TranslationService,
    private readonly key: string
  ) {
    this.translate.languageChanged
      .pipe( takeUntil( this.onDestroy ) )
      .subscribe( language => {
        this.getItems();
      } );
    this.getItems();
  }

  private getItems(): void {

    const previousIndeces = this.selectedIndeces;
    this.items.length = 0;

    const optionGroup = this.translate.getGroup( this.key );
    if (optionGroup) {
      const optionValues = Object.getOwnPropertyNames( optionGroup );
      if (optionValues.length) {
        for (let i = 0; i < optionValues.length; i++) {
          this.items.push( {
            value: optionValues[ i ],
            text: optionGroup[ optionValues[ i ] ],
            // selected: previousIndeces.includes( i )
            selected: -1 < previousIndeces.indexOf( i )
          } );
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

  get selectedCount(): number {
    return this.items
      .filter( item => item.selected )
      .length;
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

  [Symbol.iterator](): IterableIterator<TranslatableOption> {
    return this;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
