import isFunction from '../../../shared/util/isFunction';
import defineValue from '../../../shared/util/defineValue';
import Array from '../../../shared/global/Array/index';


export default function $create( length, insert, isInsert ){
  let i = 0;
  const result = Array( length );

  if( !isInsert && isFunction( insert ) ){
    for( ; i < length; i++ )
      result[ i ] = insert( i );
  }else{
    for( ; i < length; i++ )
      result[ i ] = insert;
  }

  return result;
}

defineValue( Array, '$create', $create );