/* 3rd party libraries */

/* locally accessible feature module code, always use a relative path */
import { Section, SectionGroup, TranslationConfig } from './models';

export function getInlineItems(
  config: TranslationConfig
): Array<string> {

  const items: Array<string> = [];
  config.sections.forEach( section => {
    if (typeof section !== 'string') {
      if ((section as SectionGroup).group) {
        (section as SectionGroup).items
          .filter( item => typeof item !== 'string' && item.type === 'inline' )
          .forEach( item => items.push( (item as Section).name ) );
      } else if ((section as Section).type === 'inline') {
        items.push( (section as Section).name );
      }
    }
  } );
  return items;
}
