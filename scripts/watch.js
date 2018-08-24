const rollup = require('rollup');
const extend = require('extend');




export const build = async config => {

  const output = config.output && config.output.file || defaultConfig.output.file;
  const name = output.replace( /^dist\//, '' );
  const start = +new Date();
  const rollupConfig = extend( true, {}, defaultConfig, config );

  await new Promise( resolve => {

    rollup
      .rollup( rollupConfig )
      .then(({ code }) => {
        console.log( code );
        resolve();
      })
  });

}

build( defaultConfig );