import { Subscription } from 'rxjs';
import { TranslatableOption } from './translatable-option.model';
import { TranslationService } from './translation.service';

interface IteratorResult { value: TranslatableOption; done: boolean; }
interface Iterator { next: () => IteratorResult; }

export class TranslatableOptionList {

  private currentIndex = -1;
  private items: Array<TranslatableOption> = [];
  private subscription: Subscription;

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
    private translate: TranslationService,
    private key: string
  ) {
    this.subscription = this.translate.languageChanged
      .subscribe( language => {
        this.getItems();
      } );
    this.getItems();
  }

  private getItems(): void {

    const previousIndex = this.currentIndex;
    this.items.length = 0;
    this.currentIndex = -1;

    const optionGroup = this.translate.getGroup( this.key );
    if (optionGroup) {
      const optionValues = Object.getOwnPropertyNames( optionGroup );
      if (optionValues.length) {
        this.currentIndex = -1 < previousIndex && previousIndex < optionValues.length ?
          optionValues.length : 0;
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

  [Symbol.iterator](): Iterator {
    let index = 0;
    return {
      next: (): IteratorResult => {
        if (index < this.items.length) {
          return {
            value: this.items[ index++ ],
            done: false
          };
        }
        return {
          value: undefined,
          done: true
        };
      }
    };
  }

  destroy(): void {
    this.subscription.unsubscribe();
  }
}
