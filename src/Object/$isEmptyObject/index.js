import define from '../../shared/util/defineValue';
import Object from '../../shared/global/Object';

/**
 * 判断传入对象是否是空对象
 * @param {Object} obj 需要判断的对象
 * @returns {Boolean}
 */
export default function $isEmptyObject( obj ){
  for( let a in obj ){
    return false;
  }
  return true;
}

define( Object, '$isEmptyObject', $isEmptyObject );