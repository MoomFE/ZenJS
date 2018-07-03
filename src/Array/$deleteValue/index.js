import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";
import congruence from "../../shared/util/congruence";
import equals from "../../shared/util/equals";


defineValue( ArrayProto, '$deleteValue $removeValue', function( value ){
  const
    isEqual = parametersDefault( arguments, 1, true )
      ? congruence
      : equals;
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
});