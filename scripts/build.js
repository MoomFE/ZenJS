const rollup = require('rollup');
const zlib = require('zlib');
const { configuration, getSize } = require('./config');


!async function(){
  for( let config of configuration ){
    const start = +new Date();
    const output = config.output;

    await new Promise( async resolve => {
      const bundle = await rollup.rollup( config );
      const { code } = await bundle.write( config.output );
      const size = getSize( code );
      const gzipSize = getSize( zlib.gzipSync( code ) );

      console.log(
        `\n${ config.output.file } 已构建完毕! ${ new Date() - start + 'ms' }` +
        `\n      size: ${ size }` +
        `\n      gzip: ${ gzipSize }`
      );
  
      resolve();
    });
  }
}();