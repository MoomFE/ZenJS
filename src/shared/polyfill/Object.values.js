import keys from "../global/Object/keys";


/**
 * 方法返回一个给定对象自身的所有可枚举属性值的数组.
 * Object.values polyfill
 */
export default Object.values || function( obj ){
  return keys( obj ).map( key => obj[ key ] );
}