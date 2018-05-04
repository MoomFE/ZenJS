import { isArray } from '../../var/index';

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
export default function $_Define( obj, name, options, options2 ){

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