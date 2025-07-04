/* tslint:disable */

import { Roman } from '../app/custom-format-extender';
import { AppStatus } from '../app/enums/app-status.enum';
import { LogLevel } from '../shared/enums/enums';

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
  first_last: ( first: Roman ) => string;
  romanNumber: ( value: Roman ) => string;
}

export interface IText_Other_Enumeration {

  title: () => string;
  appStatus: () => string;
  logLevel: () => string;
  season: () => string;
  month: () => string;
  statusName: ( status: AppStatus ) => string;
  levelName: ( level: LogLevel ) => string;
}

export interface IText_Other_CamelCase {

  title: () => string;
}
