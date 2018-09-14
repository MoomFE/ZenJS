import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import { isFunction, isBoolean, isArray } from "../../../shared/const/type";
import { isNumber } from "../../../shared/util/isNumber";
import congruence from "../../../shared/util/congruence";
import equals from "../../../shared/util/equals";
import parametersRest from "../../../shared/util/parametersRest";
import isArrayLike from "../../../shared/util/isArrayLike";
import keys from "../../../shared/global/Object/keys";
import chunk from "../../../shared/util/chunk";


/**
 * @param {Array} self 进行遍历的数组
 * @param {Number} count 保存的查找结果数量
 * @param {Boolean} reverse 是否反向查询
 * @param {IArguments} args 来源方法的 arguments
 */
function findIndex( self, count, reverse, args, predicate, obj, fromIndex ){

  let length;

  // 传入的内容不可检索或者数组为空
  if( predicate == null || !( length = self.length ) ){
    return -1;
  }

  /** 遍历 */
  let traversal;
  /** 首个参数是否是方法类型 */
  const predicateIsFunction = predicate[ isFunction ];

  // 首个参数是方法或布尔值
  if( predicateIsFunction || predicate[ isBoolean ] ){

    // $findIndex( Function, fromIndex )
    // 传入的方法是用作数组遍历时的手动进行检测
    if( predicateIsFunction && ( args.length === 1 || isNumber( obj ) ) ){
      traversal = predicate;
      fromIndex = obj || reverse ? -1 : 0;
    }
    // $findIndex( Function | Boolean, key, value, fromIndex )
    // $findIndex( Function | Boolean, Array, fromIndex )
    // $findIndex( Function | Boolean, Object, fromIndex )
    // 传入的方法是用作值比对时进行检测
    else{
      // 正常参数校正 index 为从 1 的地方开始
      args = parametersRest( args, 1 );
      // 指定值比对时的方法
      if( !predicateIsFunction ){
        predicate = predicate ? congruence : equals;
      }
    }
  }
  // $findIndex( key, value, fromIndex )
  // $findIndex( Array, fromIndex )
  // $findIndex( Object, fromIndex )
  else{
    // 首个参数不是对比的方法, 那么校正 obj 和 fromIndex 的位置
    obj = args[ 0 ];
    fromIndex = args[ 1 ];
    // 默认使用全等的比较方法
    predicate = congruence;
  }

  // 指定值遍历时的检测方法
  if( !traversal ){

    // 第一个参数不是数组或对象, 视为传入 key, value 进行匹配
    if( typeof obj !== 'object' ){
      obj = fromIndex === undefined ? [ obj ] : [ obj, fromIndex ];
      fromIndex = args[ 2 ];
    }

    // 将类数组类型的按照键值对进行分割
    // $findIndex( [ 'key', 'value', 'key2', 'value2' ] ) -> [ [ 'key', 'value' ], [ 'key2', 'value2' ] ]
    if( isArrayLike( obj ) ){
      obj = chunk( obj, 2 );
    }

    traversal = getTraversal( obj, predicate );

  }


  /** 初始开始遍历的 index */
  let index = isNumber( fromIndex ) ? fromIndex
                                    : reverse ? length - 1
                                              : 0;
  /** 值, 缓存 */
  let value;
  /** 每次自增的值 */
  const add = reverse ? -1 : 1;
  /** 返回值 */
  const result = [];

  // 遍历数组内的对象, 交给检测方法进行检测
  for( ; index >= 0 && index <= length -1; index+= add ){
    if( traversal( value = self[ index ] ) && result.$push([ index, value ]).length >= count ){
      return result;
    }
  }

  return result;
}

function getTraversal( obj, predicate ){
  const objIsArray = obj[ isArray ];

  return object => {
    if( object == null || !keys( object ).length ){
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


defineValue( ArrayProto, '$find', function( predicate, obj, fromIndex ){
  const result = findIndex( this, 1, false, arguments, predicate, obj, fromIndex );
  return ( result[ 0 ] || [] )[ 1 ];
});

defineValue( ArrayProto, '$findIndex', function( predicate, obj, fromIndex ){
  const result = findIndex( this, 1, false, arguments, predicate, obj, fromIndex );
  return result.length ? result[ 0 ][ 0 ]
                       : -1;
});

defineValue( ArrayProto, '$findLast', function( predicate, obj, fromIndex ){
  const result = findIndex( this, 1, true, arguments, predicate, obj, fromIndex );
  return result.length ? result[ 0 ][ 0 ]
                       : -1;
});

defineValue( ArrayProto, '$findLastIndex', function( predicate, obj, fromIndex ){
  const result = findIndex( this, 1, true, arguments, predicate, obj, fromIndex );
  return result.length ? result[ 0 ][ 0 ]
                       : -1;
});

defineValue( ArrayProto, '$findAll', function( predicate, obj, fromIndex ){
  return findIndex( this, Infinity, true, arguments, predicate, obj, fromIndex ).map( arr => arr[ 1 ] );
});