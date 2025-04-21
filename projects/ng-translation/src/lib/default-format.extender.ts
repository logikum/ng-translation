/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { FormatData, FormatExtender } from './models';
import { TranslationService } from './services';

export class DefaultFormatExtender implements FormatExtender {

  translation: TranslationService;
  readonly formatNames: Array<string> = [];

  transpile(
    format: string,
    data: FormatData
  ): string | undefined {

    return undefined;
  }
}
