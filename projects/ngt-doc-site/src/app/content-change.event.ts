/* 3rd party libraries */

/* locally accessible feature module code, always use a relative path */

export type Chapter = 'home' | 'documentation' | 'ngt-formatter' | 'icu-formatter' | 'api' | 'about';

export interface ContentChangeEvent {

  chapter: Chapter;
  content: string;
}
