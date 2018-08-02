import { isNumber } from "./isNumber";
import isFunction from "./isFunction";


export default function create( length, insert, isInsert ){

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