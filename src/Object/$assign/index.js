import Object from '../../shared/global/Object/index';
import assign from '../../shared/global/Object/assign';
import concat from '../../shared/global/Array/prototype/concat';

import define from '../../shared/util/defineValue';
import isPlainObject from '../../shared/util/isPlainObject';
import isArray from '../../shared/global/Object/assign';

/**
 * Object.assign 的深拷贝版本
 */
export default function $assign(){

  let i = 1,
      length = arguments.length,
      target = arguments[ 0 ] || {},

      options,
      name, src, copy, copyIsArray;
  
  for( ; i < length; i++ ){

    // 得到参数
    if( ( options = arguments[ i ] ) != null ){

      // 遍历参数中所有元素
      for( name in options ){

        // 防止无限拷贝
        if( ( copy = options[ name ] ) === target ){
          continue;
        }

        //
        src = target[ name ];

        if(
          copy && (
            isPlainObject( copy ) || ( copyIsArray = isArray( copy ) )
          )
        ){
          
          if( copyIsArray ){
            copyIsArray = false;
          }
        }


      }
    }
  }
};

define( Object, '$assign', $assign );