/* 3rd party libraries */
import { InjectionToken } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { FormatData } from './format-data.model';

export const NGT_FORMAT_EXTENDER = new InjectionToken<FormatExtender>(
  'NGT_FORMAT_EXTENDER'
);

export interface FormatExtender {

  translation: any;
  readonly formatNames: Array<string>;
  interpolate(
    format: string,
    data: FormatData
  ): string | undefined;
}
