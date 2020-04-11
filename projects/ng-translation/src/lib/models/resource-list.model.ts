/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { LoaderType } from '../types';
import { Resource } from './resource.model';
import { Section, SectionGroup, SectionItem, SectionList } from './translation-config.model';

export class ResourceList {

  private readonly store: Map<string, Array<Resource>> = new Map<string, Array<Resource>>();

  constructor(
    sections: SectionList,
    defaultPath: string,
    defaultFormat: string = 'JSON',
    defaultType: LoaderType = 'json'
  ) {
    const defaultName = '';
    const defaultResources: Array<Resource> = [ ];

    sections.forEach( (item: SectionItem) => {

      if (typeof item === 'string') {
        defaultResources.push( {
          name: item,
          alias: item,
          path: defaultPath,
          format: defaultFormat,
          type: defaultType,
          inUse: false
        } );

      } else if ((item as Section).name) {
        const section = item as Section;
        defaultResources.push( {
          name: section.name,
          alias: section.alias ?? section.name,
          path: section.path ?? defaultPath,
          format: section.format ?? defaultFormat,
          type: section.type ?? defaultType,
          inUse: false
        } );

      } else if ((item as SectionGroup).group) {
        const group = item as SectionGroup;
        const groupName = group.group;
        const resources: Array<Resource> = [ ];

        group.items.forEach( (groupItem: Section) => {

          if (typeof groupItem === 'string') {
            resources.push( {
              name: groupItem,
              alias: groupItem,
              path: group.path ?? defaultPath,
              format: group.format ?? defaultFormat,
              type: group.type ?? defaultType,
              inUse: false
            } );

          } else if ((groupItem as Section).name) {
            resources.push( {
              name: groupItem.name,
              alias: groupItem.alias ?? groupItem.name,
              path: groupItem.path ?? group.path ?? defaultPath,
              format: groupItem.format ?? group.format ?? defaultFormat,
              type: groupItem.type ?? group.type ?? defaultType,
              inUse: false
            } );
          }
        } );
        this.addResources( groupName, resources );
      }
    } );
    this.addResources( defaultName, defaultResources );
  }

  private addResources(
    groupName: string,
    resources: Array<Resource>
  ): void {

    this.store.set( groupName, resources );
  }

  getResources(
    groupName: string
  ): Array<Resource> {

    const resources = this.store.get( groupName );
    resources.forEach( resource => {
      resource.inUse = true;
    } );
    return resources;
  }

  getResourcesInUse(): Array<Resource> {

    let resources: Array<Resource> = [ ];
    this.store.forEach( group => {
      resources = resources.concat( group.filter( r => r.inUse ) );
    } );
    return resources;
  }
}
