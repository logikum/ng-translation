/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { LoaderType } from '../types';

export interface Resource {

  name: string;
  alias: string;
  path: string;
  format: string;
  type: LoaderType;
  inUse: boolean;
}

export interface ResourceLoader {

  load( language: string, resource: Resource): Promise<any>;
}
