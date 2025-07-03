import { CurrencyValue } from '@logikum/ngt-common';

export interface IReaderGeneral {

  text: IReaderGeneralText;
}

export interface IReaderGeneralText {

  otherElements: () => string;
  smurfs: () => string;
  element: IReaderGeneralTextElement;
  today: ( date: Date ) => string;
  stock: ( rise: number, points: number ) => string;
  book: ( current: CurrencyValue, onSale: CurrencyValue ) => string;
}

export interface IReaderGeneralTextElement {

  earth: () => string;
  fire: () => string;
  water: () => string;
  wind: () => string;
}
