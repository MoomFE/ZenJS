import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import congruence from "../../../shared/util/congruence";
import equals from "../../../shared/util/equals";
import parametersRest from "../../../shared/util/parametersRest";
import { isFunction, isBoolean, isArray } from "../../../shared/const/type";
import slice from "../../../shared/global/Array/prototype/slice";
import $isArrayLike from "../../Array/$isArrayLike/index";
import $chunk from "../../Array/$chunk/index";
import keys from "../../../shared/global/Object/keys";


defineValue( ArrayProto, '$findIndex', function( predicate, key ){
  return findIndex( this, predicate, key, arguments );
});

export default function findIndex( self, predicate, key, args ){

  let length;

  // 传入的内容不可检索或者数组为空
  if( predicate == null || !( length = self.length ) ){
    return -1;
  }

  let traversal,
      predicateIsFunction = predicate[ isFunction ];


  if( predicateIsFunction || predicate[ isBoolean ] ){

    // $findIndex( Function )
    // 传入的方法是用作数组遍历时的手动进行检测
    if( predicateIsFunction && args.length === 1 ){
      traversal = predicate;
    }
    // $findIndex( Function | Boolean, key, value )
    // $findIndex( Function | Boolean, Array )
    // $findIndex( Function | Boolean, Object )
    // 传入的方法是用作值比对时进行检测
    else{
      // 正常参数校正 index 为从 1 的地方开始
      args = parametersRest( args, 1 );
      // 指定值比对时的方法
      if( !predicateIsFunction ){
        predicate = predicate ? congruence : equals;
      }
    }
  }else{
    // 首个参数不是对比的方法, 那么校正 key 的位置
    key = args[ 0 ];
    // 默认使用全等的比较方法
    predicate = congruence;
  }

  // 指定值遍历时的检测方法
  if( !traversal ){

    // 第一个参数不是数组或对象, 将所有传入参数转为数组
    // $findIndex( 'key', 'value', 'key2', 'value2' ) -> [ 'key', 'value', 'key2', 'value2' ]
    if( typeof key !== 'object' ){
      key = slice.call( args );
    }

    // 将类数组类型的按照键值对进行分割
    // $findIndex( [ 'key', 'value', 'key2', 'value2' ] ) -> [ [ 'key', 'value' ], [ 'key2', 'value2' ] ]
    if( $isArrayLike( key ) ){
      key = $chunk( key, 2 );
    }

    traversal = getTraversal( key, predicate );

  }

  let index = 0;

  // 遍历数组内的对象, 交给检测方法进行检测
  for( ; index < length; index++ ){
    if( traversal( self[ index ] ) ){
      return index;
    }
  }

  return -1;
}

function getTraversal( key, predicate ){
  const keyIsArray = key[ isArray ];

  return object => {
    if( object == null || !keys( object ).length ){
      return false;
    }
    return ( keyIsArray ? checkArray : checkObject )( key, object, predicate );
  }
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