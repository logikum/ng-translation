/* 3rd party libraries */
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* locally accessible feature module code, always use relative path */
import { TranslatableOption } from './translatable-option.model';
import { TranslationService } from '../services';

export class TranslatableOptionList implements IterableIterator<TranslatableOption>, OnDestroy {

  private readonly onDestroy: Subject<void> = new Subject();
  private readonly items: Array<TranslatableOption> = [];
  private currentIndex = -1;
  private iteratorIndex = 0;

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
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[ i ].value === value) {
        this.currentIndex = i;
        this.items[ i ].selected = true;
      } else {
        this.items[ i ].selected = false;
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

    const previousIndex = this.currentIndex;
    this.currentIndex = -1;
    this.items.length = 0;

    const optionGroup = this.translate.getGroup( this.key );
    if (optionGroup) {
      const optionValues = Object.getOwnPropertyNames( optionGroup );
      if (optionValues.length) {
        this.currentIndex = -1 < previousIndex && previousIndex < optionValues.length ?
          previousIndex : 0;
        for (let i = 0; i < optionValues.length; i++) {
          this.items.push( {
            value: optionValues[ i ],
            text: optionGroup[ optionValues[ i ] ],
            selected: i === this.currentIndex
          } );
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

  [Symbol.iterator](): IterableIterator<TranslatableOption> {
    return this;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
