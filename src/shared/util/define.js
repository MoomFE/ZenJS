import Array from '../global/Array/index';
import isArray from '../global/Array/isArray';
import defineProperty from '../global/Object/defineProperty';

const definePropertyOptions = {
  configurable: true,// 删除/定义
  enumerable: false,// 枚举
  writable: true// 写入
};

export default function define( obj, name, options, options2 ){
  if( isArray( obj ) && obj instanceof Array ){
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