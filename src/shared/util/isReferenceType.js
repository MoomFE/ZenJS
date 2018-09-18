/**
 * 判断一个对象是否是引用类型
 * @param {any} obj 需要判断的对象
 */
export default function isReferenceType( obj ){
  var type = typeof obj;
  return type === 'object' || type === 'function';
}