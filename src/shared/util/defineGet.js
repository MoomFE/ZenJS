import define from './define';
import { defineGetPropertyOptions } from '../const/definePropertyOptions';
import isObject from './isObject';

/**
 * 定义对象属性, 快捷定义 get 选项
 * @param {Object} obj 需要添加属性的元素
 * @param {String} name 属性名
 * @param {Function} get 添加到 get 选项的方法
 * @param {Object} options 属性选项
 */
export default function defineGet( obj, name, get, options ){
  let key;

  if( isObject( name ) ){
    for( key in name ){
      defineGet( obj, key, name[ key ], options );
    }
    return name;
  }

  return define(
    obj, name, { get },
    options || defineGetPropertyOptions
  ),
         get;
} 