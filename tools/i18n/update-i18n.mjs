import fs from 'fs';
import path from 'path';

const sourcePath = path.resolve( process.cwd(), 'projects/www/src' );
const targetPath = sourcePath + '/assets/i18n/hu';

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

let count = 0;
const texts = { };

walkTree( sourcePath, ( err, files ) => {
  if (err) {
    console.error( err );
  } else {
    files.forEach( file => {

      // const shortFile = file.substr( sourcePath.length + 1 );
      readFile( file );

      // console.log( `    ${ shortFile }` );
      count++;
      if (count === files.length) {
        console.log( `Processed text files: ${ count }` );
        writeJsonFiles();
      }
    } );
  }
} );

const readFile = ( textFile ) => {

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
      if (colonPos == 0) {
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

const writeJsonFiles = () => {

  console.log('### www/src/assets/i18n/hu:')
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
      JSON.stringify( texts[ property ], null, 2 )
    );
    console.log(`>   ${shortPath}.json`);
  }
}

const dashize = str => {
  return str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
}
