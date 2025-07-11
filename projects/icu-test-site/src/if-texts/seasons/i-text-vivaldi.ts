/* tslint:disable */

import { Roman } from '../../app/custom-format-extender';
import { AppStatus } from '../../app/enums/app-status.enum';
import { LogLevel } from '../../shared/enums/enums';

export interface IText_Seasons$Vivaldi {

  spring: () => string;
  summer: () => string;
  autumn: () => string;
  winter: () => string;
  title: () => string;
}
