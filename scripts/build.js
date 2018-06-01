const rollup = require('rollup');
const extend = require('extend');
const fs = require('fs');
const zlib = require('zlib');
const uglify = require('uglify-js');

const defaultConfig = require('./config');
const allConfig = [
  {}, {
    input: 'dist/Zen.js',
    output: 'dist/Zen.min.js'
  }
];

const readmePath = __dirname.replace( /scripts$/, 'README.md' ),
      debugSearch = /(\|\sDebug\s+\|\s)[0-9\.\skb]+(\s\|\s)[0-9\.\skb]+(\s\|)/,
      minSearch = /(\|\sMin\s+\|\s)[0-9\.\skb]+(\s\|\s)[0-9\.\skb]+(\s\|)/;

!async function(){

  for( let config of allConfig ){

    const input = config.input || defaultConfig.input;
    const output = config.output || defaultConfig.output.file;
    const now = new Date();

    const isMinify = /min\.js$/.test( output );
    const rollupConfig = extend(
      {
        input,
        output: { file: output }
      },
      defaultConfig
    );

    await new Promise(( resolve, reject ) => {

      rollup
        .rollup( rollupConfig )
        .then( bundle => {
          return bundle.generate( rollupConfig.output )
        })
        .then( ({ code }) => {
          if( isMinify ){
            let minify = uglify.minify( code );
            
            if( minify.error ){
              code = [
                '\n******************************************************************'+
                `\n* Minify ERROR: ${ minify.error.message }` +
                `\n* Line: ${ minify.error.line }` +
                `\n* Col: ${ minify.error.col }` +
                '\n******************************************************************'
              ];
            }else{
              code = defaultConfig.output.banner + '\n' + minify.code;
            }
          }
          return write( output, code );
        })
        .then( ([ size, gzip ]) => {
          console.log(`${ output } 已构建完毕! ${ new Date() - now + 'ms' }\n      size: ${ size }\n      gzip: ${ gzip }`);

          fs.writeFileSync(
            readmePath,
            fs.readFileSync( readmePath, 'utf-8' )
              .replace( isMinify ? minSearch : debugSearch, `$1${ size }$2${ gzip }$3` ),
            'utf-8'
          );

          resolve();
        })
        .catch( error => {
          console.log( error );
          resolve();
        });
    });
  }
}();


function write( output, code ){
  if( Array.isArray( code ) ){
    return Promise.reject( code[ 0 ] );
  }
  return new Promise(( resolve, reject ) => {
    fs.writeFile( output, code, err => {
      if( err ) return reject( err );

      zlib.gzip( code, ( err, zipped ) => {
        if( err ) return reject( err );

        resolve([
          getSize( code ),
          getSize( zipped )
        ]);
      });
    });
  });
}

function getSize( code ){
  return ( code.length / 1024 ).toFixed( 2 ) + 'kb';
}