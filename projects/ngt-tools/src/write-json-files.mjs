import fs from "fs";
import stringify from "json-stable-stringify";
import { cleanTexts, dashize } from './helper.mjs';

export const writeJsonFiles = (targetPath, texts) => {

  cleanTexts( texts );
  for (let property in texts) {

    let i18nDir = targetPath;
    let filename = property;

    let shortPath;
    if (property.indexOf( '/' ) > -1) {
      const parts = property.split( '/' );
      for (let i = 0; i < parts.length; i++) {
        if (parts[ i ].trim() === '')
          throw new Error(`Invalid filename: ${property}`);
        filename = dashize( parts[ i ].trim() );
        parts[ i ] = filename;
        if (i > 0) {
          i18nDir = i18nDir + '/' + parts[ i - 1 ];
          if (!fs.existsSync( i18nDir ))
            fs.mkdirSync( i18nDir );
        }
      }
      shortPath = parts.join( '/' );
    } else {
      shortPath = dashize( property );
    }

    filename = dashize( filename );
    const jsonPath = i18nDir + '/' + filename + '.json';
    fs.writeFileSync(
      jsonPath,
      // JSON.stringify( texts[ property ], null, 2 )
      stringify( texts[ property ], { cmp: compare, space: 2 } )
    );
    console.log(`>   ${shortPath}.json`);
  }
};

const compare = ( a, b ) => {

  if (typeof a.value === 'object') {
    if (typeof b.value === 'object') {
      // a == object, b == object
      return a.key > b.key ? 1 : -1;
    } else {
      // a == object, b == string
      return 1;
    }
  } else {
    if (typeof b.value === 'object') {
      // a == string, b == object
      return -1;
    } else {
      // a == string, b == string
      return a.key > b.key ? 1 : -1;
    }
  }
};
