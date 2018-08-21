import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import { autoGetPredicate } from "../../../shared/util/getPredicate";


defineValue( ArrayProto, '$inArray', function( _value ){

  let index,
      length = this.length;

  if( !length ){
    return false;
  }

  const args = autoGetPredicate( arguments, _value, 1 );
  const value = args[ 0 ];
  const predicate = args[ 1 ];

  for( index = 0; index < length; index++ ){
    if( predicate( this[ index ], value ) ){
      return true;
    }
  }

  return false;
});