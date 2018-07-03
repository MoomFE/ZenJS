import defineValue from "../../shared/util/defineValue";
import Array from "../../shared/global/Array/index";
import $create from "../$create/index";
import ceil from "../../shared/global/Math/ceil";


defineValue( Array, '$chunk', ( array, size ) => {
  let length;
  
  if( !array || size < 1 || !( length = array.length ) ){
    return [];
  }
  
  return $create( ceil( length / size ), index => {
    const start = index * size;
    return array.slice( start, start + size );
  });
});