import toString from "../global/Object/prototype/toString";

/**
 * 判断传入对象是否是正则
 * @param {Object} obj 需要判断的对象
 */
export default function isRegExp( obj ){
  return toString.call( obj ) === '[object RegExp]'
}