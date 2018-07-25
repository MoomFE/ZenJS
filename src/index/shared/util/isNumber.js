/**
 * 判断传入对象是否是 Number 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export default function isNumber( obj ){
  return typeof obj === 'number';
}