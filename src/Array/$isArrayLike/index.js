import defineValue from "../../shared/util/defineValue";
import Array from "../../shared/global/Array/index";
import isNumber from "../../shared/util/isNumber";
import isFunction from "../../shared/util/isFunction";


const MAX_SAFE_INTEGER = 9007199254740991;

defineValue( Array, '$isArrayLike', obj => {
  if( obj != null && !isFunction( obj ) ){
    const length = obj.length;
    if( isNumber( length ) && length > -1 && length % 1 === 0 && length <= MAX_SAFE_INTEGER ){
      return true;
    }
  }
  return false;
});