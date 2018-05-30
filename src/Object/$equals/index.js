import defineValue from "../../shared/util/defineValue";
import Object from "../../shared/global/Object/index";
import toString from "../../shared/global/Object/prototype/toString";
import keys from "../../shared/global/Object/keys";
import $isPlainObject from "../$isPlainObject/index";
import isArray from "../../shared/global/Array/isArray";
import stringify from "../../shared/global/JSON/stringify";
import isFunction from "../../shared/util/isFunction";


function unFunctionObject( obj ){
  var type = typeof obj;
  return type !== 'object' && type !== 'function';
}

export default function $equals( obj, obj2, parent ){
  let key,
      value, value2;

  if( obj === obj2 ){
    return true;
  }

  if( !obj || parent && parent === obj ){
    return false;
  }else if( toString.call( obj ) !== toString.call( obj2 ) ){
    return false;
  }else if( unFunctionObject( obj ) ){
    return false;
  }else if( $isPlainObject( obj ) || isArray( obj ) ){
    if( keys( obj ).length !== keys( obj2 ).length ){
      return false;
    }
    for( key in obj ){
      if( !$equals( obj[ key ], obj2[ key ], obj ) ){
        return false;
      }
    }
  }else if( isFunction( obj.toString ) && !( key = obj.toString() ).startsWith('[object ') ){
    if( obj2.toString() !== key ){
      return false;
    }
  }else{
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