export const getIcuParams = ( text ) => {

  let icuParams = [];

  return icuParams.length ? ` ${ icuParams.join(', ')} ` : '';
};
