/* 3rd party libraries */
import { InjectionToken } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { TranslationService } from '../services';
import { FormatData } from './format-data.model';

export const NGT_TRANSPILE_EXTENDER = new InjectionToken<TranspileExtender>(
  'NGT_TRANSPILE_EXTENDER'
);

export interface TranspileExtender {

  translation: TranslationService;
  readonly formatNames: Array<string>;
  transpile(
    format: string,
    data: FormatData
  ): string | undefined;
}

export abstract class TranspileExtenderBase implements TranspileExtender {

  translation: TranslationService;
  abstract readonly formatNames: Array<string>;
  abstract transpile(
    format: string,
    data: FormatData
  ): string | undefined;
}
