import isEmptyObject from "../../../shared/util/isEmptyObject";
import keys from "../../../shared/global/Object/keys";
import isArray from "../../../shared/global/Array/isArray";


/**
 * 方法返回对象的遍历方法
 * @param {*} obj 
 * @param {*} predicate 
 */
export function getTraversal( obj, predicate ){
  const objIsArray = isArray( obj );

  return object => {
    if( obj == null || isEmptyObject( object ) ){
      return false;
    }
    return ( objIsArray ? checkArray : checkObject )( obj, object, predicate );
  };
}

function checkArray( source, object, predicate ){
  const length = source.length;
  let index = 0,
      chunk, key;

  // 遍历检测对象
  for( ; index < length; index++ ){
    chunk = source[ index ];
    key = chunk[ 0 ];

    if( !( key in object && ( chunk.length === 1 || predicate( chunk[ 1 ], object[ key ] ) ) ) ){
      return false;
    }
  }

  return true;
}

function checkObject( source, object, predicate ){
  const sKeys = keys( source ),
        sLength = sKeys.length;
  let index = 0,
      key;

  // 遍历检测对象
  for( ; index < sLength; index++ ){
    key = sKeys[ index ];

    if( !( key in object && predicate( source[ key ], object[ key ] ) ) ){
      return false;
    }
  }

  return true;
}