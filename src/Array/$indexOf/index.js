import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import isFunction from "../../shared/util/isFunction";
import $toArray from "../$toArray/index";
import unFunctionObject from "../../shared/util/unFunctionObject";
import $isArrayLike from "../$isArrayLike/index";
import $chunk from "../$chunk/index";
import isArray from "../../shared/global/Array/isArray";
import keys from "../../shared/global/Object/keys";
import $equals from "../../Object/$equals/index";


defineValue( ArrayProto, '$indexOf', function( key, value ){
  let length;

  if( key == null || !( length = this.length ) ){
    return -1;
  }

  // 第一个参数不是数组或对象
  // 将所有传入参数转为数组
  if( unFunctionObject( key ) ){
    key = $toArray( arguments );
  }

  // 将类数组类型的按照键值对进行分割
  if( $isArrayLike( key ) ){
    key = $chunk( key, 2 );
  }

  // 获取检测方法
  const predicate = getPredicate( key );

  // 遍历数组内的对象, 交给检测方法进行检测
  for( let index = 0; index < length; index++ ){
    if( predicate( this[ index ] ) ){
      return index;
    }
  }
  return -1;
});

function getPredicate( key ){// fn array object
  // 用户传的检测方法
  if( isFunction( key ) ){
    return key;
  }

  const keyIsArray = isArray( key );

  return object => {
    if( object == null || !keys( object ).length ){
      return false;
    }
    return ( keyIsArray ? checkArray : checkObject )( key, object );
  }
}

function checkArray( source, object ){
  let index = 0,
      chunk, key;
  const length = source.length;

  // 遍历检测对象
  for( ; index < length; index++ ){
    chunk = source[ index ];
    key = chunk[ 0 ];

    if( !( key in object && ( chunk.length === 1 || $equals( chunk[ 1 ], object[ key ] ) ) ) ){
      return false;
    }
  }

  return true;
}

function checkObject( source, object ){
  let key;

  for( key in source ){
    if( !( key in object && $equals( source[ key ], object[ key ] ) ) ){
      return false;
    }
  }

  return true;
}