import define from './define';
import { definePropertyOptions } from '../const/definePropertyOptions';

/**
 * 定义对象属性, 快捷定义 value 选项
 * @param {Object} obj 需要添加属性的元素
 * @param {String} name 属性名
 * @param {Function} value 添加到 value 选项的方法
 * @param {Object} options 属性选项
 */
export default function defineValue( obj, name, value, options ){
  return define(
    obj, name, { value },
    options || definePropertyOptions
  ),
         value;
}