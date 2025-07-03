
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
  updated: () => string;
}

export interface IText_Translate_Percent {

  title: () => string;
  basic_f: () => string;
  basic_l: ( arg0: number ) => string;
  basic_s: ( arg0: number ) => string;
  minid_f: () => string;
  minid_l: () => string;
  minid_s: () => string;
  minfd_f: () => string;
  minfd_l: () => string;
  minfd_s: () => string;
  maxfd_f: () => string;
  maxfd_l: () => string;
  maxfd_s: () => string;
  minsd_f: () => string;
  minsd_l: () => string;
  minsd_s: () => string;
  maxsd_f: () => string;
  maxsd_l: () => string;
  maxsd_s: () => string;
  mixed_f: () => string;
  mixed_l: () => string;
  mixed_s: () => string;
  usegrp_f: () => string;
  usegrp_l: () => string;
  usegrp_s: () => string;
}

export interface IText_Translate_Number {

  title: () => string;
  basic_f: () => string;
  basic_l: ( arg0: number ) => string;
  basic_s: ( arg0: number ) => string;
  minid_f: () => string;
  minid_l: () => string;
  minid_s: () => string;
  minfd_f: () => string;
  minfd_l: () => string;
  minfd_s: () => string;
  maxfd_f: () => string;
  maxfd_l: () => string;
  maxfd_s: () => string;
  minsd_f: () => string;
  minsd_l: () => string;
  minsd_s: () => string;
  maxsd_f: () => string;
  maxsd_l: () => string;
  maxsd_s: () => string;
  mixed_f: () => string;
  mixed_l: () => string;
  mixed_s: () => string;
  usegrp_f: () => string;
  usegrp_l: () => string;
  usegrp_s: () => string;
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
  default_l: ( arg0: Date ) => string;
  default_s: ( arg0: Date ) => string;
  short_f: () => string;
  short_l: () => string;
  short_s: () => string;
  medium_f: () => string;
  medium_l: () => string;
  medium_s: () => string;
  long_f: () => string;
  long_l: () => string;
  long_s: () => string;
  full_f: () => string;
  full_l: () => string;
  full_s: () => string;
  fractional_f: () => string;
  fractional_l: () => string;
  fractional_s: () => string;
}

export interface IText_Translate_Currency {

  title: () => string;
  default_f: () => string;
  default_l: ( price: [number, string] ) => string;
  default_s: ( price: [number, string] ) => string;
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
