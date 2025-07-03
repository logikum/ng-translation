import fs from 'fs';
import path from 'path';
import { writeInterfaces } from './write-interfaces.mjs';
import { writeJsonFiles } from './write-json-files.mjs';

const walkTree = ( dir, done ) => {

  let results = [];
  fs.readdir( dir, ( err, list ) => {
    if (err) {
      done( err, [] );
    } else {

      let i = 0;
      (function next() {
        let file = list[i++];
        if (!file) {
          done( null, results );
        } else {

          file = path.resolve( dir, file );
          fs.stat( file, ( err, stat ) => {
            if (stat && stat.isDirectory()) {
              walkTree( file, ( err, res ) => {
                results = results.concat( res || [] );
                next();
              } );
            } else {
              if (file.endsWith( '.text' )) {
                results.push( file );
              }
              next();
            }
          } );
        }
      })();
    }
  } );
};

const readFile = ( textFile, texts ) => {

  let node = texts;
  let usePreviousNode = false;
  let previousNode = null;
  let previousKey = '';
  const allFileContents = fs.readFileSync( textFile, 'utf-8' );

  allFileContents.split( /\r?\n/ ).forEach( line =>  {

    if (line.startsWith( '#' ))
      return;
    if (line.trim() === '')
      return;

    if (line.startsWith( '>' )) {
      let line1 = line.substring( 1 );
      if (line1.trim() === '')
        return;

      const sepPos = line1.lastIndexOf( '/' );
      if (sepPos > -1) {
        line1 = line1.substring(0, sepPos).replaceAll('.', '|')
          + line.slice( sepPos + 1 );
      }
      line1.trim().split( '.' ).forEach( nodeName => {
        const subNode = nodeName.replaceAll('|', '.');
        if (!node[ subNode ]) {
          node[ subNode ] = { };
        }
        node = node[ subNode ];
      });
      return;
    }

    let data = [];
    if (line.startsWith( '  ' )) {
      data = [ '', line ];
      usePreviousNode = true;
    } else {
      usePreviousNode = false;
      const colonPos = line.indexOf( ':' );
      if (colonPos === 0) {
        throw new Error(`Missing key: ${line}`);
      } else if (colonPos < 0) {
        data = [ line, '' ];
      } else {
        data = [ line.substring( 0, colonPos ), line.substring( colonPos + 1 ) ];
      }
    }

    let key = data[ 0 ].trim();
    if (key.startsWith( '.' ) || key.endsWith( '.' ))
      throw new Error(`Invalid key: ${key}`);

    let currentNode = usePreviousNode ? previousNode : node;
    if (!usePreviousNode) {
      if (key.indexOf( '.' ) > 0) {
        const subnodes = key.split( '.' );
        for (let i = 0; i < subnodes.length - 1; i++ ) {
          const subnode = subnodes[ i ];
          if (!currentNode[ subnode ]) {
            currentNode[ subnode ] = { };
          }
          currentNode = currentNode[ subnode ];
          key = subnodes[ i + 1 ];
        }
      }
    }

    const currentKey = usePreviousNode ? previousKey : key.trim();
    if (usePreviousNode) {
      currentNode[ currentKey ] = currentNode[ currentKey ] + ' ' + data[ 1 ].trim();
    } else {
      currentNode[ currentKey ] = data[ 1 ].trim();
    }
    previousNode = currentNode;
    previousKey = currentKey;
  } );
}

export const updateI18n = ( sourcePath, targetPath, interfacePath, formatter ) => {

  let count = 0;
  const texts = { };

  walkTree( sourcePath, ( err, files ) => {
    if (err) {
      console.error( err );
    } else {
      files.forEach( file => {
        try {
          readFile( file, texts );
        } catch ( err ) {
          console.error( `Error in file: ${ file.substring(process.cwd().length + 1) }` );
          console.error( err.message );
        }
        count++;
      } );
      if (count === files.length) {
        console.log( `Processed text files: ${count}` );
        if (interfacePath) {
          writeInterfaces( interfacePath, formatter, texts );
        }
        writeJsonFiles( targetPath, texts );
      }
      console.log( '' );
      console.log( 'Update completed. Watching for file changes...' );
      console.log( '' );
    }
  } );
}
