/* 3rd party libraries */
import { FormatData, FormatExtender } from '@logikum/ngt-common';

/* locally accessible feature module code, always use a relative path */
import { TranslationService } from '../translation.service';

export abstract class FormatExtenderBase implements FormatExtender {

  translation: TranslationService;
  abstract readonly formatNames: Array<string>;
  abstract interpolate(
    format: string,
    data: FormatData
  ): string | undefined;
}
