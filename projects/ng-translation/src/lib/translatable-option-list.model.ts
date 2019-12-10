import { Subscription } from 'rxjs';
import { TranslatableOption } from './translatable-option.model';
import { TranslationService } from './translation.service';

export class TranslatableOptionList {

  private currentValue: string;
  private subscription: Subscription;

  get selectedValue(): string {
    return this.currentValue;
  }
  set selectedValue( value: string ) {
    this.currentValue = value;
    this.items.forEach( item => {
      item.selected = item.value === value;
    } );
  }
  items: Array<TranslatableOption> = [];

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

    const selected = this.items.find( option => option.selected);
    this.currentValue = selected ? selected.value : '';
    this.items.length = 0;

    const optionGroup = this.translate.getGroup( this.key );
    if (optionGroup) {
      const optionValues = Object.getOwnPropertyNames( optionGroup );

      const self = this;
      optionValues.forEach( value => {
        if (!self.currentValue) {
          self.currentValue = value;
        }
        self.items.push( {
          value: value,
          text: optionGroup[ value ],
          selected: value === self.currentValue
        } );
      } );
    }
  }

  destroy(): void {
    this.subscription.unsubscribe();
  }
}
