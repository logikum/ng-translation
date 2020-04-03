/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */

export interface Resource {

  name: string;
  alias: string;
  path: string;
  format: string;
  type: 'json' | 'text' | 'blob' | 'arraybuffer';
  inUse: boolean;
}

export interface ResourceLoader {

  load( language: string, resource: Resource): Promise<any>;
}
