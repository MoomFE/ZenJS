const { build } = require('./shared');


const builder = [
  {}, {
    output: {
      file: 'dist/zen.min.js'
    }
  }, {
    output: {
      file: 'dist/zen.common.js',
      format: 'cjs'
    }
  }, {
    output: {
      file: 'dist/zen.esm.js',
      format: 'es'
    }
  }
];

!async function(){
  for( let config of builder ){
    await build( config );
  }
}();