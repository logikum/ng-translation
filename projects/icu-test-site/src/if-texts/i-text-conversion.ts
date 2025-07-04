/* tslint:disable */

import { Roman } from '../app/custom-format-extender';
import { AppStatus } from '../app/enums/app-status.enum';
import { LogLevel } from '../shared/enums/enums';

export interface IText_Conversion {

  csvFile: IText_Conversion_CsvFile;
  poFile: IText_Conversion_PoFile;
}

export interface IText_Conversion_PoFile {

  title: () => string;
}

export interface IText_Conversion_CsvFile {

  title: () => string;
}
