import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import parametersDefault from "../../../shared/util/parametersDefault";
import congruence from "../../../shared/util/congruence";
import equals from "../../../shared/util/equals";
import { isFunction } from "../../../shared/const/type";


defineValue( ArrayProto, '$equals', function( obj ){

  if( !obj || obj[ isFunction ] ){
    return false;
  }

  let index = 0,
      length = this.length;

  if( length !== obj.length ){
    return false;
  }

  const
    isEqual = parametersDefault( arguments, 1, true )
      ? congruence
      : equals;

  for( ; index < length; index++ ){
    if( !isEqual( this[ index ], obj[ index ] ) ){
      return false;
    }
  }

  return true;
});