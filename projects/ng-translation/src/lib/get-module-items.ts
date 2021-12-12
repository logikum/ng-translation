/* 3rd party libraries */

/* locally accessible feature module code, always use relative path */
import { Section, SectionGroup, TranslationConfig } from './models';

export function getModuleItems(
  config: TranslationConfig,
  moduleName: string
): Array<string> {

  let items: Array<string> = [];
  const sections = config.sections;
  if (sections) {

    for (const property in sections) {
      if (sections.hasOwnProperty( property )) {
        const section = sections[ property ];

        if (typeof section !== 'string') {
          if ((section as SectionGroup).group === moduleName) {
            const sectionItems = (section as SectionGroup).items;
            if (sectionItems instanceof Array) {
              items = items.concat( sectionItems as Array<string> );
            } else if (typeof sectionItems === 'string') {
              items.push( sectionItems );
            }
          } else if ((section as Section).name === moduleName) {
            items.push( (section as Section).name );
          }
        }
      }
    }
  }
  return items;
}
