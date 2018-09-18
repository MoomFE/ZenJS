import defineValue from "../../../shared/util/defineValue";
import Array from "../../../shared/global/Array/index";
import isArray from "../../../shared/global/Array/isArray";
import slice from "../../../shared/global/Array/prototype/slice";


defineValue( Array, '$copy', function( source, array ){

  if( !source || !source.length ){
    return [];
  }

  if( isArray( array ) ){
    return array.concat( source );
  }

  return slice.call( source );
});