
export interface IText_Other {

  camelCase: IText_Other_CamelCase;
  enumeration: IText_Other_Enumeration;
  formatExtender: IText_Other_FormatExtender;
  inlineLoader: IText_Other_InlineLoader;
}

export interface IText_Other_InlineLoader {

  title: () => string;
}

export interface IText_Other_FormatExtender {

  title: () => string;
  range: () => string;
  first_last: ( arg0: string ) => string;
  romanNumber: ( arg0: string ) => string;
}

export interface IText_Other_Enumeration {

  title: () => string;
  appStatus: () => string;
  logLevel: () => string;
  season: () => string;
  month: () => string;
  statusName: ( arg0: string ) => string;
  levelName: ( arg0: string ) => string;
}

export interface IText_Other_CamelCase {

  title: () => string;
}
