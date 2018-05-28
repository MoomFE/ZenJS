import defineValue from "../../shared/util/defineValue";
import ArrayProto from '../../shared/global/Array/prototype/index';

function $each( callback ){
  let index = 0,
      length = this.length,
      value;
    
  for( ; index < length; index++ ){
    value = this[ index ];

    if( callback.call( value, value, index, this ) === false ){
      break;
    }
  }

  return this;
}

defineValue( ArrayProto, '$each', $each );