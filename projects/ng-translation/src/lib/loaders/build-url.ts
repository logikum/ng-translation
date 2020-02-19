/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { Resource } from '../models';

export function buildUrl(
  language: string,
  resource: Resource
): string {

  return resource.url
    .replace(/{\s*language\s*}/gi, language)
    .replace(/{\s*section\s*}/gi, resource.name)
    ;
}
