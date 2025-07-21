export const cleanTexts = texts => {

  // Remove empty nodes.
  for (let property in texts) {
    if (typeof texts[ property ] !== 'string') {
      const propertyCount = cleanTexts( texts[ property ] );
      if (propertyCount === 0) {
        delete texts[ property ];
      }
    }
  }
  // Return the count of properties.
  return Object.keys( texts ).length;
};

export const dashize = str => {
  return str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
};

export const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
