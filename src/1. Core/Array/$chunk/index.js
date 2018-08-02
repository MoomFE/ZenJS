import defineValue from "../../../shared/util/defineValue";
import Array from "../../../shared/global/Array/index";
import create from "../../../shared/util/createArray";
import ceil from "../../../shared/global/Math/ceil";
import ArrayProto from "../../../shared/global/Array/prototype/index";


export default function $chunk( array, size ){
  let length;

  if( !array || size < 1 || !( length = array.length ) ){
    return [];
  }

  return create( ceil( length / size ), index => {
    const start = index * size;
    return array.slice( start, start + size );
  });
}

defineValue( Array, '$chunk', $chunk );

defineValue( ArrayProto, '$chunk', function( size ){
  return $chunk( this, size );
});