/* tslint:disable */

export interface IText_Enums {

  logLevel: IText_Enums_LogLevel;
  season: IText_Enums_Season;
  month: IText_Enums_Month;
}

export interface IText_Enums_Month {

  jan: () => string;
  feb: () => string;
  mar: () => string;
  apr: () => string;
  may: () => string;
  jun: () => string;
  jul: () => string;
  aug: () => string;
  sep: () => string;
  oct: () => string;
  nov: () => string;
  dec: () => string;
}

export interface IText_Enums_Season {

  spring: () => string;
  summer: () => string;
  autumn: () => string;
  winter: () => string;
}

export interface IText_Enums_LogLevel {

  info: () => string;
  success: () => string;
  warning: () => string;
  error: () => string;
}
