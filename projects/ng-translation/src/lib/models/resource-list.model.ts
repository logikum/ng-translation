/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { Section, SectionGroup, SectionItem, SectionList } from './translation-config.model';

export interface Resource {

  name: string;
  alias: string;
  url: string;
  format: string;
  inUse: boolean;
}

export class ResourceList {

  private readonly store: Map<string, Array<Resource>> = new Map<string, Array<Resource>>();

  constructor(
    sections: SectionList,
    translationUrl: string,
    translationFormat: string = 'JSON'
  ) {
    const defaultName = '';
    const defaultResources: Array<Resource> = [ ];

    sections.forEach( (item: SectionItem) => {

      if (typeof item === 'string') {
        defaultResources.push( {
          name: item,
          alias: item,
          url: translationUrl,
          format: translationFormat,
          inUse: false
        } );

      } else if ((item as Section).name) {
        const section = item as Section;
        defaultResources.push( {
          name: section.name,
          alias: section.alias ?? section.name,
          url: section.url ?? translationUrl,
          format: section.format ?? translationFormat,
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
              url: group.url ?? translationUrl,
              format: group.format ?? translationFormat,
              inUse: false
            } );

          } else if ((groupItem as Section).name) {
            resources.push( {
              name: groupItem.name,
              alias: groupItem.alias ?? groupItem.name,
              url: groupItem.url ?? group.url ?? translationUrl,
              format: groupItem.format ?? group.format ?? translationFormat,
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
