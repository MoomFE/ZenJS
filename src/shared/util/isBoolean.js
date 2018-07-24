/**
 * 判断传入对象是否是 Boolean 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export default function isBoolean( obj ){
  return typeof obj === 'boolean';
}