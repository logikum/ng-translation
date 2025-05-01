/* 3rd party libraries */
import { InjectionToken } from '@angular/core';

/* locally accessible feature module code, always use a relative path */
import { InterpolationData } from './interpolation-data.model';
import { LocalizationRef } from './localization-ref.model';
import { FormatExtender } from './format-extender.model';

export interface FormatService {

  insert: (
    data: InterpolationData,
    args?: any
  ) => string;

  getLocalizationRef: () => LocalizationRef;

  extender: FormatExtender;
}

export const NGT_FORMAT_SERVICE = new InjectionToken<FormatService>(
  'NGT_FORMAT_SERVICE'
);
