import { IReaderGeneral } from './i-reader-general';

export interface IReader {

  app: IReaderApp;
  conversion: IReaderConversion;
  enums: IReaderEnums;
  general: IReaderGeneral;
  mitLicense: IReaderMitLicense;
  model: IReaderModel;
  null: IReaderNull;
  other: IReaderOther;
  seasons: IReaderSeasons;
  shared: IReaderShared;
  translate: IReaderTranslate;
  vivaldi: IReaderVivaldi;
}

// tslint:disable-next-line:no-empty-interface
export interface IReaderApp {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderConversion {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderEnums {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderMitLicense {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderModel {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderNull {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderOther {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderSeasons {
  autumn: IReaderSeasonsAutumn;
  spring: IReaderSeasonsSpring;
  summer: IReaderSeasonsSummer;
  winter: IReaderSeasonsWinter;
  vivaldi: IReaderSeasonsVivaldi;
}
// tslint:disable-next-line:no-empty-interface
export interface IReaderShared {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderTranslate {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderVivaldi {}

// tslint:disable-next-line:no-empty-interface
export interface IReaderSeasonsAutumn {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderSeasonsSpring {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderSeasonsSummer {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderSeasonsWinter {}
// tslint:disable-next-line:no-empty-interface
export interface IReaderSeasonsVivaldi {}
