import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";

function _equal( one, two ){
  return one == two;
}
function _congruence( one, two ){
  return one === two;
}

export default function $deleteValue( value, congruence = true ){
  let index = 0,
      length = this.length,
      isEqual = congruence ? _congruence : _equal;
  
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