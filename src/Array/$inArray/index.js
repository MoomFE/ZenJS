import define from '../../shared/util/defineValue';
import ArrayProto from '../../shared/global/Array/prototype/index';

/**
 * 查找数组内是否有此传入值
 * -- 弱检测
 * -- 强检测使用 Array.prototype.includes
 * 
 * @param {Object} obj 需要检测的值
 * @returns {Boolean}
 */
export default function $inArray( obj ){
  let i = 0,
      len = this.length;

  for( ; i < len; i++ )
    if( this[ i ] == obj ) return true;
  return false;
}

define( ArrayProto, '$inArray', $inArray );