import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";


defineValue( ArrayProto, '$set', function( index, value ){

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

  if( index < 0 && ( index = array.length + index ) < 0 ){
    index = 0;
  }

  array[ index ] = value;

}