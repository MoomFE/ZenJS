import defineValue from "../../../shared/util/defineValue";
import Object from "../../../shared/global/Object/index";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import toString from "../../../shared/global/Object/prototype/toString";
import DomElement from "../../../shared/global/DomElement/index";
import isPlainObject from "../../../shared/util/isPlainObject";
import keys from "../../../shared/global/Object/keys";
import rType from "../../../shared/const/rType";
import isMap from "../../../shared/util/isMap";
import isSet from "../../../shared/util/isSet";
import mapSetToArray from "../../../shared/util/mapSetToArray";
import $isArrayLike from "../../Array/$isArrayLike/index";
import isReferenceType from "../../../shared/util/isReferenceType";


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

  // 非引用类型 ( String, Boolean, Number )
  if( !isReferenceType( obj ) ){
    return false;
  }

  // 对于 object 更加细致点的比对 ( Map, Set, ... )
  // 它们两都是 [object Object]
  if( obj.constructor !== obj2.constructor ){
    return false;
  }

  // 是数组类型或类数组类型 ( Array, LikeArray )
  if( $isArrayLike( obj ) ){
    return types.array( obj, obj2 );
  }

  // 原始对象类型 ( JSON )
  if( isPlainObject( obj ) ){
    return types.object( obj, obj2 );
  }

  let oType = oString.match( rType )[ 1 ].toLowerCase();

  // 有针对性的比对方法 ( Regexp, Date, Function )
  if( oType in types ){
    return types[ oType ]( obj, obj2 );
  }

  // ( Elemnet )
  if( DomElement && obj instanceof DomElement ){
    return types.element( obj, obj2 );
  }

  // ( Map, Set )
  if( isMap( obj ) || isSet( obj ) ){
    return equals(
      mapSetToArray( obj ),
      mapSetToArray( obj2 )
    );
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

  /**
   * @param {Function} obj 
   * @param {Function} obj2 
   */
  function( obj, obj2 ){
    return obj.toString() === obj2.toString();
  }

};


defineValue( Object, '$equals', equals );

defineValue( ObjectProto, '$equals', function( obj2 ){
  return equals( this, obj2 );
});