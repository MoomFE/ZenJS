import toString from "../global/Object/prototype/toString";

/**
 * 判断传入对象是否是数字
 * @param {Object} obj 需要判断的对象
 */
export default function isNumber( obj ){
  return toString.call( obj ) === '[object Number]'
}