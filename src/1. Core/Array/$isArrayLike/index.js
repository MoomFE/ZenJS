import defineValue from "../../../shared/util/defineValue";
import Array from "../../../shared/global/Array/index";
import isNumber from "../../../shared/util/isNumber";
import { isFunction, isBoolean, isArray } from "../../../shared/const/type";


const MAX_SAFE_INTEGER = 9007199254740991;

export default function $isArrayLike( obj ){

  if( obj == null || obj[ isFunction ] ){
    return false;
  }

  if( obj[ isArray ] ){
    return true;
  }

  const length = obj.length;

  if( isNumber( length ) && length > -1 && length % 1 === 0 && length <= MAX_SAFE_INTEGER ){
    return true;
  }

  return false;
}

defineValue( Array, '$isArrayLike', $isArrayLike );