import defineProperty from '../global/Object/defineProperty';
import { addEventListener } from '../const/event';

let supportsPassiveEvent = false;

try{

  const options = defineProperty( {}, 'passive', {
    get: () => {
      supportsPassiveEvent = true;
    }
  });

  window[ addEventListener ]( 'test', null, options );

}catch(e){}

export {
  supportsPassiveEvent
};