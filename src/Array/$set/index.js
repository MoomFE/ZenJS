import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import fixArrayIndex from "../../shared/util/fixArrayIndex";


defineValue( ArrayProto, '$set $edit', function( index, value ){

  if( typeof index === 'object' ){
    let key;
    for( key in index ){
      $set( this, key, index[ key ] );
    }
  }else{
    $set( this, index, value );
  }

  return this;
});

function $set( array, index, value ){

  index = fixArrayIndex( array, index );

  array.splice( index, 1, value );

}