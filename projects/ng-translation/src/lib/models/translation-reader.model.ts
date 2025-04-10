/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { LocalizeContext } from './localize-context.model';

export interface TranslationReader {

  $implicit: object;
  readonly localize: LocalizeContext;
}
