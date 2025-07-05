/* tslint:disable */

import { Roman } from '../app/custom-format-extender';
import { AppStatus } from '../app/enums/app-status.enum';
import { LogLevel } from '../shared/enums/enums';

export interface IText_General {

  attribute: IText_General_Attribute;
  code: IText_General_Code;
  text: IText_General_Text;
  pipe: IText_General_Pipe;
  reader: IText_General_Reader;
  structural: IText_General_Structural;
}

export interface IText_General_Structural {

  title: () => string;
}

export interface IText_General_Reader {

  title: () => string;
  form: IText_General_Reader_Form;
}

export interface IText_General_Reader_Form {

  hint: () => string;
  name: IText_General_Reader_Form_Name;
}

export interface IText_General_Reader_Form_Name {

  label: () => string;
  minLength: ( minLength: number, recommended: number ) => string;
  maxLength: ( maxLength: number ) => string;
}

export interface IText_General_Pipe {

  title: () => string;
}

export interface IText_General_Text {

  otherElements: () => string;
  element: IText_General_Text_Element;
  smurfs: () => string;
  today: ( today: Date ) => string;
  stock: ( points: number, surge: number ) => string;
  book: ( current: [number, string], onSale: [number, string] ) => string;
}

export interface IText_General_Text_Element {

  earth: () => string;
  water: () => string;
  wind: () => string;
  fire: () => string;
}

export interface IText_General_Code {

  title: () => string;
}

export interface IText_General_Attribute {

  title: () => string;
}
