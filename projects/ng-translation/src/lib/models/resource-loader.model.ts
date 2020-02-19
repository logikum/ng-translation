/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { Resource } from './resource.model';

export interface ResourceLoader {

  load( language: string, resource: Resource): Promise<any>;
}
