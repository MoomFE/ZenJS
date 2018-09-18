import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import isObject from "../../../shared/util/isObject";
import fixArrayIndex from "../../../shared/util/fixArrayIndex";
import entries from "../../../shared/global/Object/entries";


defineValue( ArrayProto, '$set $edit', function( index, value ){

  if( isObject( index ) ){
    entries( index ).forEach( arr => set( this, arr[0], arr[1] ) )
  }else{
    set( this, index, value )
  }

  return this;
});

function set( array, index, value ){
  const length = array.length;

  if( ( index = fixArrayIndex( array, index ) ) >= length ){
    index = length - 1;
  }

  array.splice( index, 1, value );
}