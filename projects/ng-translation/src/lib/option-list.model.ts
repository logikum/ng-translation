import { Option } from './option.model';
import { TranslationService } from './translation.service';

export class OptionList {

  private currentValue: string;

  get selectedValue(): string {
    return this.currentValue;
  }
  set selectedValue( value: string ) {
    this.currentValue = value;
    this.items.forEach( item => {
      item.selected = item.value === value;
    } );
  }
  items: Array<Option> = [];

  constructor(
    private translate: TranslationService,
    private key: string
  ) {
    this.translate.languageChange.subscribe( language => {
      this.getItems();
    } );
    this.getItems();
  }

  private getItems() {

    const selected = this.items.find( option => option.selected);
    this.currentValue = selected ? selected.value : '';
    this.items.length = 0;

    const optionGroup = this.translate.getGroup( this.key );
    const optionValues = Object.getOwnPropertyNames( optionGroup );

    const self = this;
    optionValues.forEach( value => {
      if (!self.currentValue) {
        self.currentValue = value;  
      }
      console.log( `Selected language: ${ self.currentValue }`);
      self.items.push( {
        value: value,
        text: optionGroup[ value ],
        selected: value === self.currentValue
      } );
    } );
  }
}
