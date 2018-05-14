const rollup = require('rollup');
const extend = require('extend');
const fs = require('fs');
const zlib = require('zlib');
const uglify = require('uglify-js');

const config = require('./config');


[
  {}, {
    input: 'dist/Zen.js',
    output: 'dist/Zen.min.js'
  }
].forEach((
  {
    input = config.input,
    output = config.output.file
  }
) => {
  
  const isMinify = /min\.js$/.test( output );
  const rollupConfig = extend(
    {
      input,
      output: { file: output }
    },
    config
  );

  rollup
    .rollup( rollupConfig )
    .then( bundle => {
      return bundle.generate( rollupConfig.output )
    })
    .then( ({ code }) => {
      if( isMinify ){
        code = config.output.banner + '\n' + uglify.minify( code ).code;
      }
      return write( output, code );
    })
    .then(([ size, gzip ]) => {
      console.log(`${ output } 已构建完毕!\n      size: ${ size }\n      gzip: ${ gzip }`);
    })
    .catch(
      console.log.bind( console )
    );

});

function write( output, code ){
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