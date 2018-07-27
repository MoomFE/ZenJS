import { isFunction } from "../const/type";

/**
 * 判断传入对象是否是 Set 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
export default function isSet( obj ){
  return isFunction( Set ) && obj instanceof Set;
}