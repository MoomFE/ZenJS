import $isPlainObject from '../../1. Core/Object/$isPlainObject/util';
import isArray from '../global/Array/isArray';
import create from '../global/Object/create';
import isBoolean from './isBoolean';


/**
 * Transplant from jQuery
 * Version: 3.3.1
 * Homepage: https://jquery.com
 */


export default function extend(){

  let i = 1,
      length = arguments.length,
      /** 目标对象 */
      target = arguments[ 0 ] || {},

      options,
      name, src, copy, copyIsArray, clone,

      /** 浅拷贝 */
      shallow = false;

	if ( isBoolean( target ) ) {
		shallow = target;
		target = arguments[ i ] || {};
		i++;
	}

  // 遍历所有的传入参数
  for( ; i < length; i++ ){

    // 判断当前传入参数是有效的
    if( ( options = arguments[ i ] ) != null ){

      // 遍历传入参数的属性
      for( name in options ){

        // 判断传入参数的属性是否和目标对象相同
        // 是相同则跳出, 防止无限拷贝
        if( ( copy = options[ name ] ) === target ){
          continue;
        }

        src = target[ name ];

        // 如果被该属性是原生对象或数组, 则进循环拷贝
        if( !shallow && copy && ( $isPlainObject( copy ) || ( copyIsArray = isArray( copy ) ) ) ){

          // 目标对象的当前属性是否和该属性类型相同
          // 不是的话, 则进行覆盖
          if( copyIsArray ){
            copyIsArray = false;
            clone = src && isArray( src ) ? src : [];
          }else{
            clone = src && $isPlainObject( src ) ? src : this === true ? create( null ) : {};
          }

          target[ name ] = $assign( clone, copy );

        }else if( copy !== undefined ){

          // 该属性不是原生对象和数组, 直接进行赋值
          target[ name ] = copy;
        }
      }
    }
  }

  return target;
};