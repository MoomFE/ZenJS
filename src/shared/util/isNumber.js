/**
 * 判断传入对象是否是 Number 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export function isNumber( obj ){
  return typeof obj === 'number' && obj === obj && isFinite( obj );
}


/**
 * 判断传入的对象是否是数字
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export function $isNumber( obj ){
  if( isNumber( obj ) ) return true;
  return isString( obj ) && !isNaN( obj - parseFloat( obj ) );
}