export const getNgtParams = ( text ) => {

  let ngtParams = [ ];

  const re = new RegExp( '\\{\\{\\s*(\\w+)[|\\s\\w]*}}', 'gm' );
  const matches = text.match( re );
  if (matches && matches.length) {

    for ( let i = 0; i < matches.length; i++) {
      const match = matches[i];

      // const result = RegExp( re ).exec( match );
      const rex = new RegExp( '\\{\\{\\s*(\\w+)[|\\s\\w]*}}', 'gm' );
      const result = rex.exec( match );
      if (result && result.length > 1) {

        const token  = result[1];
        const argName = isNaN(parseInt( token, 10 )) ? token : `arg${token}`;

        let argType = 'string';
        const barPos = match.indexOf( '|' );
        if (barPos > 0) {
          const colonPos = match.indexOf( ':', barPos + 1 );
          const typeCode = (colonPos > barPos
            ? match.substring( barPos + 1, colonPos )
            : match.substring( barPos + 1, match.length - 2 )
          ).trim();

          switch (typeCode) {
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
            default:
              argType = 'string';
              break;
          }
        }
        const len = ngtParams.push( `${argName}: ${argType}` );
      } else {
        console.log( `Not found: (${ i }) ${ text }` );
      }
    }
  }
  return ngtParams.length > 0 ? ` ${ ngtParams.join(', ')} ` : '';
}
