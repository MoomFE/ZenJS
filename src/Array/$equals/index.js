import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";
import congruence from "../../shared/util/congruence";
import equals from "../../shared/util/equals";

export default function $equals( obj ){

  if( !obj ){
    return false;
  }

  if( !Array.isArray( obj ) ){
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
}

defineValue( ArrayProto, '$equals', $equals );