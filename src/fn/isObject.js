/**
 * 判断传入对象是否是对象
 * @param {Object} obj 需要判断的对象
 */
export default function isObject( obj ){
  return obj !== null && typeof obj === 'object';
}