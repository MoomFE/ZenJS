import { isNumber } from "./isNumber";
import isFunction from "./isFunction";
import isArray from "../global/Array/isArray";


const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * 判断传入对象是否是一个类数组对象
 * @param value 需要判断的对象
 */
export default function isArrayLike( value ){ 

  if( value == null || isFunction( value ) ){
    return false;
  }

  if( isArray( value ) ){
    return true;
  }

  const length = value.length;

  if( isNumber( length ) && length > -1 && length % 1 === 0 && length <= MAX_SAFE_INTEGER ){
    return true;
  }

  return false;
}