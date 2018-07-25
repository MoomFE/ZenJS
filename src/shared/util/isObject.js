/**
 * 判断传入对象是否是 Object 类型, 并且不为 null
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export default function isObject( obj ){
  return obj !== null && typeof obj === 'object';
}