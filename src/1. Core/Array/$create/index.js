import isFunction from '../../../shared/util/isFunction';
import defineValue from '../../../shared/util/defineValue';
import Array from '../../../shared/global/Array/index';
import isNumber from '../../../shared/util/isNumber';


export default function $create( length, insert, isInsert ){

  if( !isNumber( length ) || length < 1 ){
    return [];
  }

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