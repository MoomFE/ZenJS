import defineValue from "../../../shared/util/defineValue";
import Object from "../../../shared/global/Object/index";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import toString from "../../../shared/global/Object/prototype/toString";
import keys from "../../../shared/global/Object/keys";
import isReferenceType from "../../../shared/util/isReferenceType";
import isPlainObject from "../../../shared/util/isPlainObject";
import $isArrayLike from "../../Array/$isArrayLike/index";
import $toArray from "../../Array/$toArray/index";
import { isArray } from "../../../shared/const/type";
import isFunction from "../../../shared/util/isFunction";
import stringify from "../../../shared/global/JSON/stringify";


export default function $equals( obj, obj2, parent ){

  let key,
      i, length,
      oToString;

  if( obj === obj2 ){
    return true;
  }

  // 其中一个是假值 ( undefined, null, false, '', 0, NaN )
  if( !obj || !obj2 ){
    return false;
  }
  // 类型不一样 ( RegExp, Element, ... )
  // 过了这一步骤, 类型比对时就只需要比对一个值, 因为类型是完全相同的
  else if( toString.call( obj ) !== toString.call( obj2 ) ){
    return false;
  }
  // 不是引用类型 ( Number, String, Boolean )
  else if( !isReferenceType( obj ) ){
    return false;
  }

  // 是原生 Object 类型
  else if( isPlainObject( obj ) ){
    // 元素数量不一样
    if( keys( obj ).length !== keys( obj2 ).length ){
      return false;
    }
    for( key in obj ){
      if( !$equals( obj[ key ], obj2[ key ] ), obj ){
        return false;
      }
    }
  }
  // 数组及类数组对象
  else if( $isArrayLike( obj ) ){
    // 类数组转为数组
    if( obj[ isArray ] ){
      obj = $toArray( obj ); obj2 = $toArray( obj2 );
    }
    // 元素数量不一样
    if( ( length = obj.length ) !== obj2.length ){

    }
    for( i = 0; i < length; i++ ){
      if( !$equals( obj[ i ], obj2[ i ] ), obj ){
        return false;
      }
    }
  }
  else if( obj instanceof Element ){
    
  }
  // 拥有 toString 方法且 toString 后的内容是有效的 ( Function )
  else if( isFunction( obj.toString ) && ( oToString = obj.toString() ).substr(0,8) !== '[object ' ){
    if( oToString !== obj2.toString() ){
      return false;
    }
  }
  // 拥有 toJSON 方法 ( Date )
  else if( isFunction( obj.toJSON ) ){
    if( obj.toJSON() !== obj2.toJSON() ){
      return false;
    }
  }
  // 其他的类型
  // 尝试使用 JSON.stringify 进行处理成字符串进行比对
  // 如果还是比对不了...
  else{
    try{
      if( stringify( obj ) !== stringify( obj2 ) ){
        return false;
      }
    }catch( error ){
      return false;
    }
  }

  return true;
}

defineValue( Object, '$equals', $equals );

defineValue( ObjectProto, '$equals', function( obj ){
  return $equals( this, obj );
});