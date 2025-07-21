/* 3rd party libraries */
import { InjectionToken } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { InterpolationData } from './interpolation-data.model';
import { LocalizationRef } from './localization-ref.model';
import { FormatExtender } from './format-extender.model';

export interface FormatterService {

  extender: FormatExtender;

  get name(): string;

  insert: (
    data: InterpolationData,
    args?: any
  ) => string;

  getLocalizationRef: () => LocalizationRef;
}

export const NGT_FORMATTER_SERVICE = new InjectionToken<FormatterService>(
  'NGT_FORMATTER_SERVICE'
);
