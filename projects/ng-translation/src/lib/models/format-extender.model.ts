/* 3rd party libraries */
import { InjectionToken } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { TranslationService } from '../services';
import { FormatData } from './format-data.model';

export const NGT_FORMAT_EXTENDER = new InjectionToken<FormatExtender>(
  'NGT_FORMAT_EXTENDER'
);

export interface FormatExtender {

  translation: TranslationService;
  readonly formatNames: Array<string>;
  transpile(
    format: string,
    data: FormatData
  ): string | undefined;
}

export abstract class TranspileExtenderBase implements FormatExtender {

  translation: TranslationService;
  abstract readonly formatNames: Array<string>;
  abstract transpile(
    format: string,
    data: FormatData
  ): string | undefined;
}
