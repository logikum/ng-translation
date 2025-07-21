/* tslint:disable */

import { Roman } from '../app/custom-format-extender';
import { AppStatus } from '../app/enums/app-status.enum';
import { LogLevel } from '../shared/enums/enums';

export interface IText_Translate {

  currency: IText_Translate_Currency;
  datetime: IText_Translate_Datetime;
  money: IText_Translate_Money;
  number: IText_Translate_Number;
  percent: IText_Translate_Percent;
  plural: IText_Translate_Plural;
}

export interface IText_Translate_Plural {

  title: () => string;
  updated: ( arg0: number|string ) => string;
}

export interface IText_Translate_Percent {

  title: () => string;
  basic_f: () => string;
  basic_l: ( arg0: number ) => string;
  basic_s: ( arg0: number ) => string;
  minid_f: () => string;
  minid_l: ( arg0: number ) => string;
  minid_s: ( arg0: number ) => string;
  minfd_f: () => string;
  minfd_l: ( arg0: number ) => string;
  minfd_s: ( arg0: number ) => string;
  maxfd_f: () => string;
  maxfd_l: ( arg0: number ) => string;
  maxfd_s: ( arg0: number ) => string;
  minsd_f: () => string;
  minsd_l: ( arg0: number ) => string;
  minsd_s: ( arg0: number ) => string;
  maxsd_f: () => string;
  maxsd_l: ( arg0: number ) => string;
  maxsd_s: ( arg0: number ) => string;
  mixed_f: () => string;
  mixed_l: ( arg0: number ) => string;
  mixed_s: ( arg0: number ) => string;
  usegrp_f: () => string;
  usegrp_l: ( arg0: number ) => string;
  usegrp_s: ( arg0: number ) => string;
}

export interface IText_Translate_Number {

  title: () => string;
  basic_f: () => string;
  basic_l: ( arg0: number ) => string;
  basic_s: ( arg0: number ) => string;
  minid_f: () => string;
  minid_l: ( arg0: number ) => string;
  minid_s: ( arg0: number ) => string;
  minfd_f: () => string;
  minfd_l: ( arg0: number ) => string;
  minfd_s: ( arg0: number ) => string;
  maxfd_f: () => string;
  maxfd_l: ( arg0: number ) => string;
  maxfd_s: ( arg0: number ) => string;
  minsd_f: () => string;
  minsd_l: ( arg0: number ) => string;
  minsd_s: ( arg0: number ) => string;
  maxsd_f: () => string;
  maxsd_l: ( arg0: number ) => string;
  maxsd_s: ( arg0: number ) => string;
  mixed_f: () => string;
  mixed_l: ( arg0: number ) => string;
  mixed_s: ( arg0: number ) => string;
  usegrp_f: () => string;
  usegrp_l: ( arg0: number ) => string;
  usegrp_s: ( arg0: number ) => string;
}

export interface IText_Translate_Money {

  title: () => string;
  default: () => string;
  code: () => string;
  name: () => string;
  symbol: () => string;
}

export interface IText_Translate_Datetime {

  title: () => string;
  default_f: () => string;
  default_l: ( arg0: Date|number ) => string;
  default_s: ( arg0: Date|number ) => string;
  short_f: () => string;
  short_l: ( arg0: Date|number ) => string;
  short_s: ( arg0: Date|number ) => string;
  medium_f: () => string;
  medium_l: ( arg0: Date|number ) => string;
  medium_s: ( arg0: Date|number ) => string;
  long_f: () => string;
  long_l: ( arg0: Date|number ) => string;
  long_s: ( arg0: Date|number ) => string;
  full_f: () => string;
  full_l: ( arg0: Date|number ) => string;
  full_s: ( arg0: Date|number ) => string;
  fractional_f: () => string;
  fractional_l: ( arg0: Date|number ) => string;
  fractional_s: ( arg0: Date|number ) => string;
}

export interface IText_Translate_Currency {

  title: () => string;
  default_f: () => string;
  default_l: ( { price }: { price: [number, string] } ) => string;
  default_s: ( { price }: { price: [number, string] } ) => string;
  code_f: () => string;
  code_l: ( arg0: [number, string] ) => string;
  code_s: ( arg0: [number, string] ) => string;
  name_f: () => string;
  name_l: ( arg0: [number, string] ) => string;
  name_s: ( arg0: [number, string] ) => string;
  symbol_f: () => string;
  symbol_l: ( { price }: { price: [number, string] } ) => string;
  symbol_s: ( { price }: { price: [number, string] } ) => string;
}
