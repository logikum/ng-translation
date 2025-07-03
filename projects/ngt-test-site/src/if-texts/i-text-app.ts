
export interface IText_App {

  model: () => string;
  general: () => string;
  translate: () => string;
  localize: () => string;
  pipe: () => string;
  conversion: () => string;
  null: () => string;
  other: () => string;
  seasons: () => string;
  enums: IText_App_Enums;
  header: IText_App_Header;
  home: IText_App_Home;
}

export interface IText_App_Home {

  title: () => string;
}

export interface IText_App_Header {

  name: () => string;
}

export interface IText_App_Enums {

  appStatus: IText_App_Enums_AppStatus;
}

export interface IText_App_Enums_AppStatus {

  construct: () => string;
  operate: () => string;
  maintain: () => string;
}
