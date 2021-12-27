/* 3rd party libraries */
import { InjectionToken } from '@angular/core';

/* locally accessible feature module code, always use relative path */
import { InlineLoaderMap, LoaderType } from '../types';

export interface Resource {

  name: string;
  alias: string;
  path: string;
  format: string;
  type: LoaderType;
  inUse: boolean;
}

export interface ResourceLoader {

  load( language: string, resource: Resource ): Promise<any>;
}

export const NGT_INLINE_LOADER = new InjectionToken<InlineLoaderMap>(
  'NGT_INLINE_LOADER'
);
