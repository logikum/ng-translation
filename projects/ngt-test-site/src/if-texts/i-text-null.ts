/* tslint:disable */

export interface IText_Null {

  currencyCodes: IText_Null_CurrencyCodes;
  localizationMethod: IText_Null_LocalizationMethod;
  localizationPipe: IText_Null_LocalizationPipe;
  text: ( arg0: string ) => string;
  number: ( arg0: number ) => string;
  percent: ( arg0: number ) => string;
  currency: ( arg0: [number, string] ) => string;
  datetime: ( arg0: Date ) => string;
  plural: () => string;
  boolean: ( arg0: string ) => string;
  translationString: IText_Null_TranslationString;
}

export interface IText_Null_TranslationString {

  title: () => string;
  dataType: () => string;
  value: () => string;
  null: () => string;
  undefined: () => string;
}

export interface IText_Null_LocalizationPipe {

  title: () => string;
  pipe: () => string;
  value: () => string;
  null: () => string;
  undefined: () => string;
}

export interface IText_Null_LocalizationMethod {

  title: () => string;
  method: () => string;
  value: () => string;
  null: () => string;
  undefined: () => string;
}

export interface IText_Null_CurrencyCodes {

  title: () => string;
  code: () => string;
  value: () => string;
  undefined: () => string;
  null: () => string;
  empty: () => string;
  test: () => string;
  noCurrency: () => string;
  lilangeni: () => string;
  invalid: () => string;
}
