import isFunction from '../../shared/util/isFunction';
import defineValue from '../../shared/util/defineValue';
import Array from '../../shared/global/Array/index';


export default function $create( length, insert ){
  let i = 0;
  const result = Array( length >>= 0 );

  if( isFunction( insert ) ){
    for( ; i < length; i++ )
      result[ i ] = insert( i );
  }else{
    for( ; i < length; i++ )
      result[ i ] = insert;
  }
}

defineValue( Array, '$create', $create );