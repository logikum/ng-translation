/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { FormatData, TranspileExtender } from './models';

export class DefaultTranspileExtender implements TranspileExtender {

  transpile(
    format: string,
    data: FormatData
  ): string | undefined {

    return undefined;
  }
}
