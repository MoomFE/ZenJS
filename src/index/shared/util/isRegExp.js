import toString from "../global/Object/prototype/toString";


/**
 * 判断传入对象是否是 RegExp 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export default function isRegExp( obj ){
  return toString.call( obj ) === '[object RegExp]'
}