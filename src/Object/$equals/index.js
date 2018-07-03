import defineValue from "../../shared/util/defineValue";
import Object from "../../shared/global/Object/index";
import toString from "../../shared/global/Object/prototype/toString";
import keys from "../../shared/global/Object/keys";
import $isPlainObject from "../$isPlainObject/util";
import isArray from "../../shared/global/Array/isArray";
import stringify from "../../shared/global/JSON/stringify";
import isFunction from "../../shared/util/isFunction";
import unFunctionObject from "../../shared/util/unFunctionObject";


export default function $equals( obj, obj2, parent ){
  let index, length, key,
      oIsArray,
      oString;

  if( obj === obj2 ){
    return true;
  }

  if( !obj || parent && parent === obj ){
    return false;
  }else if( toString.call( obj ) !== toString.call( obj2 ) ){
    return false;
  }else if( unFunctionObject( obj ) ){
    return false;
  }else if( $isPlainObject( obj ) || ( oIsArray = isArray( obj ) ) ){
    if( oIsArray ){
      if( obj.length !== obj2.length ){
        return false;
      }
      for( index = 0, length = obj.length; index < length; index++ ){
        if( !$equals( obj[ index ], obj2[ index ], obj ) ){
          return false;
        }
      }
    }else{
      if( keys( obj ).length !== keys( obj2 ).length ){
        return false;
      }
      for( key in obj ){
        if( !$equals( obj[ key ], obj2[ key ], obj ) ){
          return false;
        }
      }
    }
  }else if( isFunction( obj.toString ) && !( oString = obj.toString() ).substr(0,8) === '[object ' ){
    if( obj2.toString() !== oString ){
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