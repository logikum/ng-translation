/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { LocalizeContext } from './localize-context.model';

export interface TranslateContext {

  $implicit: ( key: string, params?: any ) => any;
  readonly localize: LocalizeContext;
}
