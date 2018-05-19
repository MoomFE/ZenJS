import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";

function _equal( one, two ){
  return one == two;
}
function _congruence( one, two ){
  return one === two;
}

export default function $deleteValue( value ){
  const
    congruence = parametersDefault( arguments, 1, true ),
    isEqual = congruence ? _congruence : _equal;
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