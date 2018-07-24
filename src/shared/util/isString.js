/**
 * 判断传入对象是否是 String 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export default function isString( obj ){
  return typeof obj === 'string';
}