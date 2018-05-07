import define from './define';

/**
 * 定义对象属性, 快捷定义 set 选项
 * @param {Object} obj 需要添加属性的元素
 * @param {String} name 属性名
 * @param {Function} set 添加到 set 选项的方法
 * @param {Object} options 属性选项
 */
export default function defineSet( obj, name, set, options ){
  define( obj, name, { set }, options );
}