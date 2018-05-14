import define from '../../shared/util/defineValue';
import ArrayProto from '../../shared/global/Array/prototype/index';

/**
 * 在数组指定位置添加元素
 * @param {Number} index 添加在数组中的位置
 * @param {Object} args 需要添加的对象, 可以是多个
 * @returns {Array}
 */
export default function $add( index, ...args ){
  let i = 0,
      len = args.length;
  
  for( ; i < len; i++){
    this.splice( index++, 0, args[ i ] );
  }

  return this;
}

define( ArrayProto, '$add', $add );