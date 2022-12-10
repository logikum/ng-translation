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
// tslint:disable-next-line:directive-class-suffix
export class TranslatableSelect implements IterableIterator<TranslatableOption>, OnDestroy {

  protected translate: TranslationService;
  protected key: string;

  private readonly onDestroy: Subject<void> = new Subject();
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

  get selectedText(): string {
    return this.currentIndex < 0 ? undefined : this.items[ this.currentIndex ].text;
  }

  get selectedItem(): TranslatableOption {
    return this.currentIndex < 0 ? undefined : this.items[ this.currentIndex ];
  }

  protected initialize() {

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
        this.currentIndex = -1 < previousIndex && previousIndex < optionValues.length
          ? previousIndex : 0;
        for (let i = 0; i < optionValues.length; i++) {
          const value = optionValues[ i ];
          const text = optionGroup[ value ];
          if (this.filter( value, text )) {
            this.items.push( {
              value: value,
              text: optionGroup[ value ],
              selected: i === this.currentIndex
            } );
          }
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
