import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";
import congruence from "../../shared/util/congruence";
import equal from "../../shared/util/equal";

export default function $deleteValue( value ){
  const
    isEqual = parametersDefault( arguments, 1, true )
      ? congruence
      : equal;
  let
    index = 0,
    length = this.length;

  for( ; index < length; ){
    if( isEqual( this[ index ], value ) ){
      this.$delete( index );
      length--;
    }else{
      index++;
    }
  }

  return this;
}

defineValue( ArrayProto, '$deleteValue', $deleteValue );