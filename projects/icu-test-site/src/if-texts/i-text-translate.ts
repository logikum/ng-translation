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
  updated: ( count: number | string ) => string;
}

export interface IText_Translate_Percent {

  title: () => string;
  basic_f: () => string;
  basic_l: ( shortPercent: number ) => string;
  basic_s: ( shortPercent: number ) => string;
  minid_f: () => string;
  minid_l: ( shortPercent: number ) => string;
  minid_s: ( shortPercent: number ) => string;
  minfd_f: () => string;
  minfd_l: () => string;
  minfd_s: ( shortPercent: number ) => string;
  maxfd_f: () => string;
  maxfd_l: () => string;
  maxfd_s: ( shortPercent: number ) => string;
  minsd_f: () => string;
  minsd_l: () => string;
  minsd_s: ( longPercent: number ) => string;
  maxsd_f: () => string;
  maxsd_l: () => string;
  maxsd_s: ( longPercent: number ) => string;
  mixed_f: () => string;
  mixed_l: ( shortPercent: number ) => string;
  mixed_s: ( shortPercent: number ) => string;
  usegrp_f: () => string;
  usegrp_l: ( longPercent: number ) => string;
  usegrp_s: ( longPercent: number ) => string;
}

export interface IText_Translate_Number {

  title: () => string;
  basic_f: () => string;
  basic_l: ( longNumber: number ) => string;
  basic_s: ( longNumber: number ) => string;
  minid_f: () => string;
  minid_l: ( shortNumber: number ) => string;
  minid_s: ( shortNumber: number ) => string;
  minfd_f: () => string;
  minfd_l: () => string;
  minfd_s: ( longNumber: number ) => string;
  maxfd_f: () => string;
  maxfd_l: () => string;
  maxfd_s: ( longNumber: number ) => string;
  minsd_f: () => string;
  minsd_l: () => string;
  minsd_s: ( shortNumber: number ) => string;
  maxsd_f: () => string;
  maxsd_l: () => string;
  maxsd_s: ( longNumber: number ) => string;
  mixed_f: () => string;
  mixed_l: ( shortNumber: number ) => string;
  mixed_s: ( shortNumber: number ) => string;
  usegrp_f: () => string;
  usegrp_l: ( longNumber: number ) => string;
  usegrp_s: ( longNumber: number ) => string;
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
  default_l: ( now: Date ) => string;
  default_s: () => string;
  short_f: () => string;
  short_l: ( now: Date ) => string;
  short_s: () => string;
  medium_f: () => string;
  medium_l: ( now: Date ) => string;
  medium_s: () => string;
  long_f: () => string;
  long_l: ( now: Date ) => string;
  long_s: () => string;
  full_f: () => string;
  full_l: ( now: Date ) => string;
  full_s: () => string;
  fractional_f: () => string;
  fractional_l: ( now: Date ) => string;
  fractional_s: () => string;
}

export interface IText_Translate_Currency {

  title: () => string;
  default_f: () => string;
  default_l: ( price: [number, string] ) => string;
  default_s: () => string;
  code_f: () => string;
  code_l: () => string;
  code_s: () => string;
  name_f: () => string;
  name_l: () => string;
  name_s: () => string;
  symbol_f: () => string;
  symbol_l: () => string;
  symbol_s: () => string;
}
