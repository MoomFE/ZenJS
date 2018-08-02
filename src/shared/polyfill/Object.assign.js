import extend from "../util/extend";
import Object from "../global/Object/index";


/**
 * 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象. 它将返回目标对象.
 * Object.assign polyfill
 */
export default Object.assign || function(){
  return extend( true, arguments );
}