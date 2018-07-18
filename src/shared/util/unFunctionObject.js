/**
 * 判断一个对象不是对象类型和方法类型
 * @param {*} obj 需要判断的对象
 */
export default function unFunctionObject( obj ){
  var type = typeof obj;
  return type !== 'object' && type !== 'function';
}