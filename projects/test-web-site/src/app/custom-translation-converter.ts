import { Resource, TranslationConverter } from 'ng-translation';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomTranslationConverter implements TranslationConverter {

  convert(
    language: string,
    resource: Resource,
    translations: any
  ): object {

    switch (resource.format) {
      case 'po':
        return po2object( language, resource, translations );
      default:
        return translations;
    }
  }
}

function po2object(
  language: string,
  resource: Resource,
  translations: string
): object {

  const result: object = {};
  const lines: Array<string> = translations.match( /^.*((\r\n|\n|\r)|$)/gm );
  let isHeader = true;
  let key = '';
  let text = '';
  let fqp = -1;
  let lqp = -1;

  lines.forEach( line => {
    if (isHeader) {
      if (line.trim() === '') {
        isHeader = false;
        key = '';
        text = '';
      }
    } else {
      if (line.startsWith( 'msgctxt ' )) {
        fqp = line.indexOf( '"' );
        lqp = line.lastIndexOf( '"' );
        if (fqp >= 7 && lqp > fqp) {
          key = line.substring( fqp + 1, lqp );
        }
      } else if (line.startsWith( 'msgstr ' )) {
        fqp = line.indexOf( '"' );
        lqp = line.lastIndexOf( '"' );
        if (fqp > 6 && lqp > fqp) {
          text = line.substring( fqp + 1, lqp );
        }
      } else if (line.trim() === '') {
        if (key && text) {
          let target = result;
          const path: Array<string> = key.split( '.' );
          for (let i = 0; i < path.length; i++) {
            if (target[ path[ i ] ] === undefined) {
              target[ path[ i ] ] = i === path.length - 1 ? text : {};
            }
            target = target[ path[ i ] ];
          }
        }
        key = '';
        text = '';
      }
    }
  } );
  return result;
}
