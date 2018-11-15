import isString from "./isString";


/**
 * 判断传入对象是否是 Number 类型, 并且不为 NaN
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export function isNumber( obj ){
  return typeof obj === 'number' && obj === obj;
}

/**
 * 判断传入对象是否是数字类型或可转为数字
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export function $isNumber( obj ){
  let num = obj;

  if( ( isNumber( obj ) || ( isString( obj ) && !isNaN( obj - ( num = parseFloat( obj ) ) ) ) ) && isFinite( num ) ){
    return true;
  }
  return false;
}