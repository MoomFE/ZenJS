import defineValue from "../../shared/util/defineValue";
import Object from "../../shared/global/Object/index";
import toString from "../../shared/global/Object/prototype/toString";
import keys from "../../shared/global/Object/keys";
import $isPlainObject from "../$isPlainObject/index";
import isArray from "../../shared/global/Array/isArray";
import stringify from "../../shared/global/JSON/stringify";


function equals( obj, obj2 ){

  if( toString.call( obj ) !== toString.call( obj2 ) ){
    return false;
  }

  if( keys( obj ).length !== keys( obj2 ).length ){
    return false;
  }

  let key,
      value,
      value2;
  
  for( key in obj ){
    value = obj[ key ];
    value2 = obj2[ key ];

    if( value === value2 ){
      continue;
    }

    if( !value || value === obj ){
      return false;
    }else if( $isPlainObject( value ) || isArray( value ) ){
      if( !equals( value, value2 ) ){
        return false;
      }
    }else{
      try {
        if( stringify( value ) !== stringify( value2 ) ){
          return false;
        }
      }catch(error){
        return false;
      }
    }
  }

  return true;
}

export default function $equals( obj, obj2 ){

  if( obj === obj2 ){
    return true;
  }else if( !obj ){
    return false;
  }else if( !equals( obj, obj2 ) ){
    return false;
  }

  return true;
}

defineValue( Object, '$equals', $equals );