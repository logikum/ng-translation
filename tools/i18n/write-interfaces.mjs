import fs from "fs";
import { capitalize, cleanTexts, dashize } from './helper.mjs';
import { getIcuParams } from './get-icu-params.mjs';
import { getNgtParams } from './get-ngt-params.mjs';

export const writeInterfaces = (targetPath, formatter, texts) => {

  cleanTexts( texts );
  const baseImports = getImportStatements( targetPath );
  for (let property in texts) {

    let interfaceDir = targetPath;
    let filename = property;
    let isSubdirectory = property.indexOf( '/' ) > -1;

    let shortPath;
    if (isSubdirectory) {
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
    let imports = isSubdirectory
      ? baseImports.replaceAll('from \'', 'from \'../')
      : baseImports;
    const text = buildInterface( formatter, '', property, texts[property], [] );
    fs.writeFileSync(
      interfacePath,
      `${ imports }${ text }`
    );
    console.log(`:   ${shortPath}.ts`);
  }
  console.log('------------------------------');
};

const buildInterface = ( formatter, prefix, name, texts, children ) => {

  const iPrefix = prefix ? prefix + '_' : '';
  const iName = capitalizeWithSlash(name);
  let text = `\nexport interface IText_${ iPrefix }${ iName } {\n\n`;
  for (let property in texts) {

    if (typeof texts[property] === 'string') {
      const params = formatter === 'icu'
        ? getIcuParams( texts[property] )
        : getNgtParams( texts[property] );
      text += `  ${property}: (${ params }) => string;\n`;

    } else {
      const cPrefix = `${ iPrefix }${ iName }`;
      const cName = capitalize(property);
      text += `  ${property}: IText_${ cPrefix }_${ cName };\n`;
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
};

const capitalizeWithSlash = (name) => {

   if (name.indexOf('/') < 0) {
     return capitalize(name);
   } else {

     const parts = name.split('/');
     const results = [ ];
     parts.forEach(part => {
       results.push( capitalize(part) );
     });
     return results.join('$');
   }
};

const getImportStatements = interfaceDir => {

  let imports = '';
  const importFilePath = interfaceDir + '/i-text.ts';
  if (fs.existsSync(importFilePath)) {
    imports = fs.readFileSync(importFilePath, { encoding: 'utf8', flag: 'r' });
  }
  return imports;
}
