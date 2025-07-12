import { capitalize } from './helper.mjs';

export const getIcuParams = ( text ) => {

  let icuParams = [];
  const re = /\{\s*(\w+)\s*[^{]*}/gm;
  let searchResult;

  while ((searchResult = re.exec( text )) !== null) {

    const skeleton  = searchResult[0];
    const argName = searchResult[1];
    let argType = 'string';

    const rex = /,\s*(\w+).*[,}]/gm;
    let result;

    while ((result = rex.exec( text )) !== null) {
      const format = result[1];

      switch (format) {
        case 'number':
          argType = (skeleton.indexOf('currency/') > 0) ? '[number, string]' : 'number';
          break;
        case 'date':
          argType = 'Date';
          break;
        case 'time':
          argType = 'Date';
          break;
        case 'plural':
          argType = 'number | string';
          break;
        default:
          argType = capitalize(format);
          break;
      }
    }
    icuParams.push( `${argName}: ${argType}` );
  }
  return icuParams.length > 0 ? ` ${ icuParams.join(', ')} ` : '';
};
