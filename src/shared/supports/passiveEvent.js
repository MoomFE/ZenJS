import defineProperty from '../global/Object/defineProperty';
import { addEventListener } from '../const/event';

/**
 * @type {Boolean} 当前环境是否支持 addEventListener 的 passive 属性
 */
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