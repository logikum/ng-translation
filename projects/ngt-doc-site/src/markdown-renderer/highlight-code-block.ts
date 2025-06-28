/* 3rd party libraries */
import highlightJs from 'highlight.js';

/* locally accessible feature module code, always use a relative path */

export function highlightCodeBlock(code: string, language: string | undefined) {
  if (language) {
    return highlightJs.highlight(code, {
      language,
    }).value;
  }

  return code;
}
