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
    let currency;

    while ((result = rex.exec( text )) !== null) {
      const format = result[1];

      switch (format) {
        case 'number':
          // argType = (skeleton.indexOf('currency/') > 0) ? '[number, string]' : 'number';
          argType = 'number';
          const match = skeleton.match( /currency\/_[_0-9]_/ );
          if (match) {
            const index = /\d/.exec( match[0] );
            if (index == null) {
              // currency/___
              currency = 'currency';
            } else {
              // currency/_i_
              currency = `currency${ index[0] }`;
            }
          }
          break;
        case 'date':
        case 'time':
          argType = 'Date|number';
          break;
        case 'plural':
          argType = 'number|string';
          break;
        default:
          argType = capitalize(format);
          break;
      }
    }
    icuParams.push( { name: argName, type: argType } );
    if (currency) {
      icuParams.push( { name: currency, type: 'string' } );
      currency = undefined;
    }
  }
  return icuParams.length
    ? ` { ${ icuParams.map(p => p.name).join(', ')} }: { ${ icuParams.map(p => `${p.name}: ${p.type}`).join(', ')} } `
    : '';
};
