/**
 * 判断传入对象是否是逻辑值
 * @param {Object} obj 需要判断的对象
 */
export default function isBoolean( obj ){
  return typeof obj === 'boolean';
}