import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import isObject from "../../../shared/util/isObject";
import fixArrayIndex from "../../../shared/util/fixArrayIndex";
import entries from "../../../shared/global/Object/entries";


function set( array, index, value ){
  index = fixArrayIndex( array, index );
  // 占位, 如果位数超过数组长度, 使用 splice 不会创建多余空间
  // [ 1, 2, 3 ].$splice( 99, 1, 4 );
  // [ 1, 2, 3, 4 ]
  array[ index ] = undefined;
  // 使 Vue 能够刷新数据
  array.splice( index, 1, value );
}

function edit( array, index, value ){
  const length = array.length;

  if( ( index = fixArrayIndex( array, index ) ) >= length ){
    index = length - 1;
  }

  array.splice( index, 1, value );
}

[ '$set', '$edit' ].forEach(( name, index ) => {
  const fn = index ? edit : set;

  defineValue( ArrayProto, name, function( index, value ){

    if( isObject( index ) ){
      entries( index ).forEach( arr => {
        fn( this, arr[0], arr[1] )
      });
    }else{
      fn( this, index, value );
    }

    return this;
  });
});