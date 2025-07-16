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
  textObject: IText_General_TextObject;
}

export interface IText_General_TextObject {

  title: () => string;
  form: IText_General_TextObject_Form;
}

export interface IText_General_TextObject_Form {

  hint: () => string;
  name: IText_General_TextObject_Form_Name;
}

export interface IText_General_TextObject_Form_Name {

  label: () => string;
  minLength: ( arg0: number, arg1: number ) => string;
  maxLength: ( { length }: { length: number } ) => string;
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
  minLength: ( arg0: string, arg1: string ) => string;
  maxLength: ( { length }: { length: string } ) => string;
}

export interface IText_General_Pipe {

  title: () => string;
}

export interface IText_General_Text {

  otherElements: () => string;
  element: IText_General_Text_Element;
  smurfs: () => string;
  today: ( arg0: Date ) => string;
  stock: ( arg1: number, arg0: number ) => string;
  book: ( arg0: [number, string], arg1: [number, string] ) => string;
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
