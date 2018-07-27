import defineValue from "../../../shared/util/defineValue";
import Object from "../../../shared/global/Object/index";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import toString from "../../../shared/global/Object/prototype/toString";
import DomElement from "../../../shared/global/DomElement/index";
import { isArray } from "../../../shared/const/type";
import isPlainObject from "../../../shared/util/isPlainObject";
import keys from "../../../shared/global/Object/keys";
import rType from "../../../shared/const/rType";
import isFunction from "../../../shared/util/isFunction";


export default function equals( obj, obj2 ){

  if( obj === obj2 ){
    return true;
  }

  // 其中一个是假值 ( undefined, null, false, '', 0, NaN )
  if( !obj || !obj2 ){
    // 对付 NaN 用的, 要不然直接就返回 false 了
    return obj !== obj && obj2 !== obj2;
  }

  let oString = toString.call( obj );

  // 实际类型不一样 ( RegExp, Element, ... )
  // 比如上面两种类型都是 object, 但是实际上却是不一样的
  // 过了这一步骤, 类型比对时就只需要比对一个值, 因为类型是完全相同的
  if( oString !== toString.call( obj2 ) ){
    return false;
  }

  // 非引用类型及方法 ( String, Boolean, Number, Function )
  // 剩下的就是对象的比对了
  if( typeof obj !== 'object' ){
    return false;
  }

  // 对于 object 更加细致点的比对 ( Map, Set, ... )
  // 它们两都是 [object Object]
  if( obj.constructor !== obj2.constructor ){
    return false;
  }

  // 是数组类型 ( Array )
  if( obj[ isArray ] ){
    return types.array( obj, obj2 );
  }

  // 原始对象类型 ( JSON )
  if( isPlainObject( obj ) ){
    return types.object( obj, obj2 );
  }

  let oType = oString.match( rType )[ 1 ].toLowerCase();

  // 有针对性的比对方法 ( Regexp, Date, Arguments )
  if( oType in types ){
    return types[ oType ]( obj, obj2 );
  }

  // ( Elemnet )
  if( DomElement && obj instanceof DomElement ){
    return type.element( obj, obj2 );
  }
  // ( Set )
  if( isFunction( Set ) && obj instanceof Set ){
    return type.set( obj, obj2 );
  }
  // ( Map )
  if( isFunction( Map ) && obj instanceof Map ){
    return type.map( obj, obj2 );
  }

  return types.object( obj, obj2 );
}


const types = {

  /**
   * @param {Array} obj 
   * @param {Array} obj2 
   */
  array( obj, obj2 ){
    let i,
        length = obj.length;

    if( length !== obj2.length ){
      return false;
    }

    for( i = 0; i < length; i++ ){
      if( !equals( obj[ i ], obj2[ i ] ) ){
        return false;
      }
    }

    return true;
  },

  /**
   * @param {Object} obj 
   * @param {Object} obj2 
   */
  object( obj, obj2 ){
    const _keys = keys( obj );
    const length = _keys.length;
    let i, key;

    if( length !== keys( obj2 ).length ){
      return false;
    }

    for( i = 0; i < length; i++ ){
      key = _keys[ i ];

      if( !equals( obj[ key ], obj2[ key ] ) ){
        return false;
      }
    }

    return true;
  },

  /**
   * @param {Element} obj 
   * @param {Element} obj2 
   */
  element( obj, obj2 ){
    return obj.innerHTML === obj2.innerHTML;
  },

  /**
   * @param {RegExp} obj 
   * @param {RegExp} obj2 
   */
  regexp( obj, obj2 ){
    return obj.toString() === obj2.toString();
  },

  /**
   * @param {Date} obj 
   * @param {Date} obj2 
   */
  date( obj, obj2 ){
    return +obj === +obj2;
  },

  set( obj, obj2 ){
    // 待完成
  },

  map( obj, obj2 ){
    if( obj.size !== obj2.size ){
      return false;
    }

    var keys = [],
        key,
        i, length;

    obj.forEach(( value, key ) => keys.push( key ) );

    for( i = 0, length = keys.length; i < length; i++ ){
      key = keys[ i ];

      if( !equals( obj.get( key ), obj2.get( key ) ) ){
        return false;
      }
    }

    return true;
  }

};

types.arguments = types.array;


defineValue( Object, '$equals', equals );

defineValue( ObjectProto, '$equals', function( obj2 ){
  return equals( this, obj2 );
});