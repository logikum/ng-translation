/* 3rd party libraries */
import { InjectionToken } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { FormatData } from './format-data.model';

export interface TranspileExtender {

  transpile(
    format: string,
    data: FormatData
  ): string | undefined;
}

export const NGT_TRANSPILE_EXTENDER = new InjectionToken<TranspileExtender>(
  'NGT_TRANSPILE_EXTENDER'
);
