import { isArray } from '../index';

const defineProperty = Object.defineProperty;
const definePropertyOptions = {
  configurable: true,// 删除/定义
  enumerable: false,// 枚举
  writable: true// 写入
};

export default function define( obj, name, options, options2 ){
  if( isArray( obj ) ){
    obj.forEach( obj => {
      define( obj, name, options, options2 );
    });
    return;
  }
  defineProperty(
    obj, name, Object.assign(
      {}, definePropertyOptions, options, options2
    )
  );
}