import isFunction from '../../shared/util/isFunction';
import define from '../../shared/util/defineValue';
import Array from '../../shared/global/Array/index';

/**
 * 快捷创建数组
 * @param {Number} length 需要创建的数组的长度
 * @param {Object} insert 需要填充到数组中的内容, 若传入方法, 将会向方法内传入当前 index
 * @returns {Array}
 */
export default function $create( length, insert ){
  let i = 0,
      result = [];

  length >>= 0;

  for( ; i < length; i++ ) result.push(
    insert && isFunction( insert ) ? insert( i ) : insert
  );

  return result;
}

define( Array, '$create', $create );