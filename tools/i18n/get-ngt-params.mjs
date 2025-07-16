import { capitalize } from "./helper.mjs";

export const getNgtParams = ( text ) => {

  const ngtParams = [ ];
  const re = /\{\{\s*(\w+)[^{]*}}/mg;
  let searchResult;
  let hasNamedArg = false;

  while ((searchResult = re.exec( text )) !== null) {

    const match  = searchResult[0];
    const token  = searchResult[1];
    const isNamedArg = isNaN(parseInt( token, 10 ));
    hasNamedArg ||= isNamedArg;
    const argName = isNamedArg ? token : `arg${token}`;

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
          argType = 'Date|number';
          break;
        case 'R':
        case 'plural':
          argType = 'number|string';
          break;
        default:
          argType = capitalize(format);
          break;
      }
    }
    ngtParams.push( { name: argName, type: argType } );
  }
  if (ngtParams.length) {
    if (hasNamedArg) {
      return ` { ${ ngtParams.map(p => p.name).join(', ')} }: { ${ ngtParams.map(p => `${p.name}: ${p.type}`).join(', ')} } `;
    } else {
      return ` ${ ngtParams.map(p => `${p.name}: ${p.type}`).join(', ')} `;
    }
  } else {
    return '';
  }
}
