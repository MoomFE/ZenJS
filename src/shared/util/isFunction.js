/**
 * 判断传入对象是否是方法
 * @param {Object} obj 需要判断的对象
 */
export default function isFunction( obj ){
  return typeof obj === 'function';
}