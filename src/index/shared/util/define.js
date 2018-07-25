import Array from '../global/Array/index';
import isArray from '../global/Array/isArray';
import defineProperty from '../global/Object/defineProperty';
import isObject from './isObject';
import $assign from '../../Object/$assign/util';


/**
 * 在一个对象上定义/修改一个新属性 ( 对 Object.defineProperty 的封装 )
 * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
 * @param {String} name 要定义或修改的属性的名称
 * @param {any} options 将被定义或修改的属性描述符
 * @param {any} options2 将被定义或修改的属性描述符, 会覆盖前一个 options
 */
export default function define( obj, name, options, options2 ){
  let key;

  if( obj == null ){
    return;
  }

  // define( [ window, document ], name, options )
  if( isArray( obj ) && obj instanceof Array ){
    obj.forEach( obj => define( obj, name, options, options2 ) );
    return;
  }

  // define( window, { key: value }, options )
  if( isObject( name ) ){
    for( key in name ){
      define( obj, key, name[ key ], options );
    }
    return;
  }

  name.split(' ').forEach( name => {
    defineProperty(
      obj, name, $assign(
        true, {}, options, options2
      )
    );
  });
}