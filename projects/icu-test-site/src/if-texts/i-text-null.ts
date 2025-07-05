/* tslint:disable */

import { Roman } from '../app/custom-format-extender';
import { AppStatus } from '../app/enums/app-status.enum';
import { LogLevel } from '../shared/enums/enums';

export interface IText_Null {

  currencyCodes: IText_Null_CurrencyCodes;
  localizationMethod: IText_Null_LocalizationMethod;
  localizationPipe: IText_Null_LocalizationPipe;
  text: ( text: string ) => string;
  number: ( value: number ) => string;
  percent: ( value: number ) => string;
  currency: ( value: [number, string] ) => string;
  date: ( value: Date ) => string;
  time: ( value: Date ) => string;
  plural: ( zero: number | string, some: number | string, many: number | string ) => string;
  boolean: ( value: string ) => string;
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
