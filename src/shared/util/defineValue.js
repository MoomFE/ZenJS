import define from './define';
import { definePropertyOptions } from '../const/definePropertyOptions';


/**
 * 在一个对象上定义/修改一个新属性的 value 描述符
 * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
 * @param {String} name 要定义或修改的属性的名称
 * @param {Function} value 将被定义或修改的 value 描述符
 * @param {any} options 将被定义或修改的属性描述符
 */
export default function defineValue( obj, name, value, options ){
  define(
    obj, name, { value },
    options || definePropertyOptions
  );

  return value;
}