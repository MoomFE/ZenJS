import { defineProperty } from '../index';

let supportsPassiveEvent = false;

try{
  let options = {};

  defineProperty( options, 'passive', {
    get: () => {
      supportsPassiveEvent = true
    }
  });

  window.addEventListener( 'test-passive-event', null, options );
  
}catch(e){}

export {
  supportsPassiveEvent
};