import define from './define';

/**
 * 定义对象属性, 快捷定义 get 选项
 * @param {Object} obj 需要添加属性的元素
 * @param {String} name 属性名
 * @param {Function} get 添加到 get 选项的方法
 * @param {Object} options 属性选项
 */
export default function defineGet( obj, name, get, options ){
  return define(
    obj, name, { get },
    options || {
      configurable: true,// 删除/定义
      enumerable: false// 枚举
    }
  ),
         get;
}