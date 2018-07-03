import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import isFunction from "../../shared/util/isFunction";
import keys from "../../shared/global/Object/keys";
import $equals from "../../Object/$equals/index";
import $toArray from "../$toArray/index";
import unFunctionObject from "../../shared/util/unFunctionObject";
import $isArrayLike from "../$isArrayLike/index";
import $chunk from "../$chunk/index";

// $indexOf( 'a' )
// $indexOf( 'a', 1 )
// $indexOf( 'a', 1, 'b', 2 )
// $indexOf( { a: 1 } )
// $indexOf( [ 'a', 1, 'b', 2 ] )
defineValue( ArrayProto, '$indexOf', function( key, value ){
  let length;

  if( key == null || !( length = this.length ) ){
    return -1;
  }

  if( unFunctionObject( key ) ){
    key = $toArray( arguments );
  }

  if( $isArrayLike( key ) ){
    key = $chunk( key, 2 );
  }

  let index = 0;
  const predicate = getPredicate( key );
  for( ; index < length; i++ ){
    
  }

});

function getPredicate( key ){// fn array object
  if( isFunction( func ) ){
    return func;
  }
}