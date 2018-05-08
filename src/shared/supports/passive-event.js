import { defineProperty } from '../index';

let supportsPassiveEvent = false;

try{

  var options = defineProperty( {}, 'passive', {
    get: () => {
      supportsPassiveEvent = true;
    }
  });

  window.addEventListener( 'test', null, options );
  
}catch(e){}

export {
  supportsPassiveEvent
};