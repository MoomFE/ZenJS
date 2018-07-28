import isFunction from "./isFunction";

/**
 * 判断传入对象是否是 Map 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export default function isMap( obj ){
  return isFunction( Map ) && obj instanceof Map;
}