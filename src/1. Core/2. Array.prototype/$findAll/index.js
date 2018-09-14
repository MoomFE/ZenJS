import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";


function findIndex( self, predicate, key, args ){

  let length;

  // 传入的内容不可检索或者数组为空
  if( predicate == null || !( length = self.length ) ){
    return -1;
  }

  /** 遍历 */
  let traversal;
}


// defineValue( ArrayProto, '$find', function( predicate, key, value, index ){

// });

// defineValue( ArrayProto, '$findIndex', function( predicate, key, value, index ){

// });

// defineValue( ArrayProto, '$findLast', function( predicate, key, value, index ){

// });

// defineValue( ArrayProto, '$findLastIndex', function( predicate, key, value, index ){

// });

// defineValue( ArrayProto, '$findAll', function( predicate, key, value, index ){

// });