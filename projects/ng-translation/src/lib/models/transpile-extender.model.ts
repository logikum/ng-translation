import { InjectionToken } from '@angular/core';

import { FormatData } from './format-data.model';

export interface TranspileExtender {

  transpile(
    format: string,
    data: FormatData
  ): string | undefined;
}

export class DefaultTranspileExtender implements TranspileExtender {

  transpile(
    format: string,
    data: FormatData
  ): string | undefined {

    return undefined;
  }
}

export const NGT_TRANSPILER = new InjectionToken<TranspileExtender>(
  'NGT_TRANSPILER'
);
