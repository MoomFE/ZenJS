const { build } = require('./shared');
const configuration = require('./config');


!async function(){
  for( let config of configuration ){
    await build( config );
  }
}();