import fs from "fs";
import { capitalize, cleanTexts, dashize } from './helper.mjs';
import { getIcuParams } from './get-icu-params.mjs';
import { getNgtParams } from './get-ngt-params.mjs';

export const writeInterfaces = (targetPath, formatter, texts) => {

  cleanTexts( texts );
  for (let property in texts) {

    let interfaceDir = targetPath;
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
          interfaceDir = interfaceDir + '/' + parts[ i - 1 ];
          if (!fs.existsSync( interfaceDir ))
            fs.mkdirSync( interfaceDir );
        }
      }
      shortPath = parts.join( '/' );
    } else {
      shortPath = dashize( property );
    }

    filename = dashize( filename );
    const interfacePath = interfaceDir + '/i-text-' + filename + '.ts';
    fs.writeFileSync(
      interfacePath,
      buildInterface( formatter, '', property, texts[property], [] )
    );
    console.log(`i   ${shortPath}.ts`);
  }
  console.log('------------------------------');
}

const buildInterface = ( formatter, prefix, name, texts, children ) => {

  const iPrefix = prefix ? prefix + '_' : '';
  const iName = capitalize(name);
  let text = `\r\nexport interface IText_${ iPrefix }${ iName } {\r\n\r\n`;
  for (let property in texts){
    if (typeof texts[property] === 'string') {
      const params = formatter === 'icu'
        ? getIcuParams( texts[property] )
        : getNgtParams( texts[property] );
      if (params.length > 0) {
        console.log( `Params: ${params} --- ${texts[ property ]}` );
      }
      text += `  ${property}: (${ params }) => string;\r\n`;
    } else {
      const cPrefix = `${ iPrefix }${ iName }`;
      const cName = capitalize(property);
      text += `  ${property}: IText_${ cPrefix }_${ cName };\r\n`;
      children.unshift( buildInterface( formatter, cPrefix, property, texts[property], children ) );
    }
  }
  text += '}\n';
  if (!prefix) {
    children.forEach(child => {
      text += child;
    });
  }
  return text;
}
