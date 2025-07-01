/* 3rd party libraries */

/* locally accessible feature module code, always use a relative path */

export interface SideMenuItem {

  id: string;
  text: string;
  children?: Array<SideMenuItem>;
}
