import defineValue from "../../../shared/util/defineValue";
import ArrayProto from '../../../shared/global/Array/prototype/index';
import Array from "../../../shared/global/Array/index";


export default function $each( array, callback ){
  const length = array.length;
  let index = 0,
      value;
  
  for( ; index < length; index++ ){
    value = array[ index ];

    if( callback.call( value, value, index, array ) === false ){
      break;
    }
  }

  return array;
}

defineValue( Array, '$each', $each );

defineValue( ArrayProto, '$each', function( callback ){
  return $each( this, callback );
});