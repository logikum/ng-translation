/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { FormatData, TranspileExtender } from './models';
import { TranslationService } from './services';

export class DefaultTranspileExtender implements TranspileExtender {

  translation: TranslationService;
  readonly formatNames: Array<string> = [];

  transpile(
    format: string,
    data: FormatData
  ): string | undefined {

    return undefined;
  }
}
