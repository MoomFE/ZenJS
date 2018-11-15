import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import isFunction from "../../../shared/util/isFunction";
import { isNumber } from "../../../shared/util/isNumber";
import isBoolean from "../../../shared/util/isBoolean";
import congruence from "../../../shared/util/congruence";
import equals from "../../../shared/util/equals";
import isArrayLike from "../../../shared/util/isArrayLike";
import chunk from "../../../shared/util/chunk";
import { getTraversal } from "./util";
import fixArrayIndex from "../../../shared/util/fixArrayIndex";


/**
 * @param {Array} self 进行遍历的数组
 * @param {Boolean} reverse 是否反向查询
 * @param {Number} count 保存的查找结果数量
 * @param {IArguments} args 来源方法的 arguments
 */
function find( self, reverse, count, args, /**/ obj, predicate, fromIndex /**/ ){

  let length;

  // 传入的内容不可检索或者数组为空
  if( obj == null || !( length = self.length ) ){
    return -1;
  }

  /** 遍历方法 */
  let traversal;

  // 首个参数是方法或布尔值
  // $findIndex( Function, fromIndex? )
  if( isFunction( obj ) ){
    traversal = obj;
    fromIndex = predicate;
  }
  // $findIndex( Array | Object )
  // $findIndex( Array | Object, fromIndex )
  // $findIndex( Array | Object, Function | Boolean )
  // $findIndex( Array | Object, Function | Boolean, fromIndex )
  else{

    // $findIndex( Array | Object, fromIndex )
    if( isNumber( predicate ) ){
      fromIndex = predicate;
      predicate = congruence;
    }
    // $findIndex( Array | Object )
    // $findIndex( Array | Object, Boolean )
    // $findIndex( Array | Object, Boolean, fromIndex )
    else if( !isFunction( predicate ) ){

      // $findIndex( Array | Object, Boolean )
      // $findIndex( Array | Object, Boolean, fromIndex )
      if( isBoolean( predicate ) ){
        predicate = predicate ? congruence : equals;
      }
      // $findIndex( Array | Object )
      else{
        predicate = congruence;
      }

    }

  }

  // 指定值遍历时的检测方法
  if( !traversal ){
    if( isArrayLike( obj ) ){
      obj = chunk( obj, 2 );
    }
    traversal = getTraversal( obj, predicate );
  }

  // 矫正 fromIndex
  fromIndex = fromIndex || ( reverse ? -1 : 0 );

  /** 初始开始遍历的 index */
  let index = isNumber( fromIndex ) ? fixArrayIndex( self, fromIndex )
                                    : reverse ? length - 1
                                              : 0
  /** 值, 缓存 */
  let value;
  /** 每次自增的值 */
  const add = reverse ? -1 : 1;
  /** 返回值 */
  const result = [];

  for( ; index >= 0 && index <= length - 1; index += add ){
    if( !!traversal( value = self[ index ] ) && result.$push([ index, value ]).length >= count ){
      return result;
    }
  }

  return result;
}


defineValue( ArrayProto, '$find', function( obj, predicate, fromIndex ){
  const result = find( this, false, 1, arguments, /**/ obj, predicate, fromIndex /**/ );
  return ( result[ 0 ] || [] )[ 1 ];
});

defineValue( ArrayProto, '$findIndex', function( obj, predicate, fromIndex ){
  const result = find( this, false, 1, arguments, /**/ obj, predicate, fromIndex /**/ );
  return result.length ? result[ 0 ][ 0 ]
                       : -1;
});

defineValue( ArrayProto, '$findLast', function( obj, predicate, fromIndex ){
  const result = find( this, true, 1, arguments, /**/ obj, predicate, fromIndex /**/ );
  return ( result[ 0 ] || [] )[ 1 ];
});

defineValue( ArrayProto, '$findLastIndex', function( obj, predicate, fromIndex ){
  const result = find( this, true, 1, arguments, /**/ obj, predicate, fromIndex /**/ );
  return result.length ? result[ 0 ][ 0 ]
                       : -1;
});

defineValue( ArrayProto, '$findAll', function( obj, predicate, fromIndex ){
  return find( this, false, Infinity, arguments, /**/ obj, predicate, fromIndex /**/ ).map( arr => arr[ 1 ] );
});