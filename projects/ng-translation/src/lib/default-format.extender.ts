/* 3rd party libraries */
import { FormatData, FormatExtender } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { TranslationService } from './translation.service';

export class DefaultFormatExtender implements FormatExtender {

  translation: TranslationService;
  readonly formatNames: Array<string> = [];

  interpolate(
    format: string,
    data: FormatData
  ): string | undefined {

    return undefined;
  }
}
