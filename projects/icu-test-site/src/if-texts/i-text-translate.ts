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
  updated: ( { just, one, formerly }: { just: number|string, one: number|string, formerly: number|string } ) => string;
}

export interface IText_Translate_Percent {

  title: () => string;
  basic_f: () => string;
  basic_l: ( { shortPercent }: { shortPercent: number } ) => string;
  basic_s: ( { shortPercent }: { shortPercent: number } ) => string;
  minid_f: () => string;
  minid_l: ( { shortPercent }: { shortPercent: number } ) => string;
  minid_s: ( { shortPercent }: { shortPercent: number } ) => string;
  minfd_f: () => string;
  minfd_l: () => string;
  minfd_s: ( { shortPercent }: { shortPercent: number } ) => string;
  maxfd_f: () => string;
  maxfd_l: () => string;
  maxfd_s: ( { shortPercent }: { shortPercent: number } ) => string;
  minsd_f: () => string;
  minsd_l: () => string;
  minsd_s: ( { longPercent }: { longPercent: number } ) => string;
  maxsd_f: () => string;
  maxsd_l: () => string;
  maxsd_s: ( { longPercent }: { longPercent: number } ) => string;
  mixed_f: () => string;
  mixed_l: ( { shortPercent }: { shortPercent: number } ) => string;
  mixed_s: ( { shortPercent }: { shortPercent: number } ) => string;
  usegrp_f: () => string;
  usegrp_l: ( { longPercent }: { longPercent: number } ) => string;
  usegrp_s: ( { longPercent }: { longPercent: number } ) => string;
}

export interface IText_Translate_Number {

  title: () => string;
  basic_f: () => string;
  basic_l: ( { longNumber }: { longNumber: number } ) => string;
  basic_s: ( { longNumber }: { longNumber: number } ) => string;
  minid_f: () => string;
  minid_l: ( { shortNumber }: { shortNumber: number } ) => string;
  minid_s: ( { shortNumber }: { shortNumber: number } ) => string;
  minfd_f: () => string;
  minfd_l: () => string;
  minfd_s: ( { longNumber }: { longNumber: number } ) => string;
  maxfd_f: () => string;
  maxfd_l: () => string;
  maxfd_s: ( { longNumber }: { longNumber: number } ) => string;
  minsd_f: () => string;
  minsd_l: () => string;
  minsd_s: ( { shortNumber }: { shortNumber: number } ) => string;
  maxsd_f: () => string;
  maxsd_l: () => string;
  maxsd_s: ( { longNumber }: { longNumber: number } ) => string;
  mixed_f: () => string;
  mixed_l: ( { shortNumber }: { shortNumber: number } ) => string;
  mixed_s: ( { shortNumber }: { shortNumber: number } ) => string;
  usegrp_f: () => string;
  usegrp_l: ( { longNumber }: { longNumber: number } ) => string;
  usegrp_s: ( { longNumber }: { longNumber: number } ) => string;
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
  default_l: ( { now, now }: { now: Date|number, now: Date|number } ) => string;
  default_s: () => string;
  short_f: () => string;
  short_l: ( { now, now }: { now: Date|number, now: Date|number } ) => string;
  short_s: () => string;
  medium_f: () => string;
  medium_l: ( { now, now }: { now: Date|number, now: Date|number } ) => string;
  medium_s: () => string;
  long_f: () => string;
  long_l: ( { now, now }: { now: Date|number, now: Date|number } ) => string;
  long_s: () => string;
  full_f: () => string;
  full_l: ( { now, now }: { now: Date|number, now: Date|number } ) => string;
  full_s: () => string;
  fractional_f: () => string;
  fractional_l: ( { now, now }: { now: Date|number, now: Date|number } ) => string;
  fractional_s: () => string;
}

export interface IText_Translate_Currency {

  title: () => string;
  default_f: () => string;
  default_l: ( { price, currency }: { price: number, currency: string } ) => string;
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
