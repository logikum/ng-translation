import { FormatData, TranspileExtender } from './models';

export class DefaultTranspileExtender implements TranspileExtender {

  transpile(
    format: string,
    data: FormatData
  ): string | undefined {

    return undefined;
  }
}
