/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { MSG_PREFIX } from './constants';

export interface TranslationChange {

  readonly context: 'app' | 'module' | 'language';
  readonly action: 'start' | 'finish';
  readonly data: string;
  readonly description: string;
}

export namespace TranslationChange {

  export function event(
    context: 'app' | 'module' | 'language',
    action: 'start' | 'finish',
    data?: string
  ): TranslationChange {

    let desc = '';

    switch (context) {
      case 'app':
        desc = action === 'start' ?
          'Initializing the app starts.' :
          'Initializing the app has ended.';
        break;
      case 'module':
        desc = action === 'start' ?
          `Initializing the module '${ data }' starts.` :
          `Initializing the module '${ data }' has ended.`;
        break;
      case 'language':
        desc = action === 'start' ?
          `Initializing the language '${ data }' starts.` :
          `Initializing the language '${ data }' has ended.`;
        break;
    }

    return {
      context: context,
      action: action,
      data: data,
      description: MSG_PREFIX + desc
    };
  }
}
