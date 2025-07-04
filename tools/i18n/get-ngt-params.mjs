import { capitalize } from "./helper.mjs";

export const getNgtParams = ( text ) => {

  const ngtParams = [ ];
  const re = /\{\{\s*(\w+)[|\s\w]*}}/mg;
  let searchResult;

  while ((searchResult = re.exec( text )) !== null) {

    const match  = searchResult[0];
    const token  = searchResult[1];
    const argName = isNaN(parseInt( token, 10 )) ? token : `arg${token}`;

    let argType = 'string';
    const barPos = match.indexOf( '|' );
    if (barPos > 0) {
      const colonPos = match.indexOf( ':', barPos + 1 );
      const format = (colonPos > barPos
          ? match.substring( barPos + 1, colonPos )
          : match.substring( barPos + 1, match.length - 2 )
      ).trim();

      switch (format) {
        case 'N':
        case 'number':
        case 'P':
        case 'percent':
          argType = 'number';
          break;
        case 'C':
        case 'currency':
          argType = '[number, string]';
          break;
        case 'D':
        case 'datetime':
          argType = 'Date';
          break;
        case 'R':
        case 'plural':
          argType = 'number | string';
          break;
        default:
          argType = capitalize(format);
          break;
      }
    }
    const len = ngtParams.push( `${argName}: ${argType}` );
  }
  return ngtParams.length > 0 ? ` ${ ngtParams.join(', ')} ` : '';
}
