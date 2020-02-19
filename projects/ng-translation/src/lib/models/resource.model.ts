/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */

export interface Resource {

  name: string;
  alias: string;
  url: string;
  format: string;
  type: 'json' | 'text' | 'blob' | 'arraybuffer';
  inUse: boolean;
}
