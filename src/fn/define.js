import { isArray } from '../var/index';

const defineProperty = Object.defineProperty,
      definePropertyOptions = {
        configurable: true,// 删除/定义
        enumerable: false,// 枚举
        writable: true// 写
      };

/**
 * 定义对象属性, 有默认配置
 * @param {Array} obj 需要添加属性的元素, 可为数组
 * @param {String} name 属性名
 * @param {Object} options 属性选项
 * @param {Object} options2 属性选项2
 */
export function $_Define( obj, name, options, options2 ){

  if( isArray( obj ) ){
    
    obj.forEach( obj => {
      $_Define( obj, name, options, options2 );
    });

    return;
  }

  defineProperty(
    obj, name, Object.assign(
      {}, definePropertyOptions, options, options2
    )
  );
}

/**
 * 定义对象属性, 快捷定义 set 选项
 * @param {Object} obj 需要添加属性的元素
 * @param {String} name 属性名
 * @param {Function} set 添加到 set 选项的方法
 * @param {Object} options 属性选项
 */
export function $_DefineSet( obj, name, set, options ){
  $_Define( obj, name, { set }, options );
}

/**
 * 定义对象属性, 快捷定义 value 选项
 * @param {Object} obj 需要添加属性的元素
 * @param {String} name 属性名
 * @param {Function} value 添加到 value 选项的方法
 * @param {Object} options 属性选项
 */
export function $_DefineValue( obj, name, value, options ){
  $_Define( obj, name, { value }, options );
}