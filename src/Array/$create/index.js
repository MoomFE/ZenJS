import isFunction from '../../shared/util/isFunction';
import define from '../../shared/util/defineValue';
import Array from '../../shared/global/Array/index';


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