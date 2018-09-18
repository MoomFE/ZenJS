import define from './define';
import { defineGetPropertyOptions } from '../const/definePropertyOptions';


/**
 * 在一个对象上定义/修改一个新属性的 get 描述符
 * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
 * @param {String} name 要定义或修改的属性的名称
 * @param {Function} get 将被定义或修改的 get 描述符
 * @param {any} options 将被定义或修改的属性描述符
 */
export default function defineGet( obj, name, get, options ){
  define(
    obj, name, { get },
    options || defineGetPropertyOptions
  );

  return get;
}