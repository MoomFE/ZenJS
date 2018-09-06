import defineValue from "../../../shared/util/defineValue";
import Array from "../../../shared/global/Array/index";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import isArrayLike from "../../../shared/util/isArrayLike";
import parametersDefault from "../../../shared/util/parametersDefault";
import { getPredicate } from "../../../shared/util/getPredicate";


export default function equals( array, array2 ){

  // 可比较数组及类数组的内容
  if( !( isArrayLike( array ) && isArrayLike( array2 ) ) ){
    return false;
  }

  const length = array.length;

  if( length !== array2.length ){
    return false;
  }

  const predicate = getPredicate(
    parametersDefault( arguments, 2, true )
  );

  for( let index = 0; index < length; index++ ){
    if( !predicate( array[ index ], array2[ index ] ) ){
      return false;
    }
  }

  return true;
}


defineValue( Array, '$equals', equals );

defineValue( ArrayProto, '$equals', function( obj, predicate ){
  return equals( this, obj, predicate );
});