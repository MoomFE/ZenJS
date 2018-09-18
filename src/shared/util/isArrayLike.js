import { isFunction, isArray } from "../const/type";
import { isNumber } from "./isNumber";


const MAX_SAFE_INTEGER = 9007199254740991;

export default function isArrayLike( obj ){ 

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