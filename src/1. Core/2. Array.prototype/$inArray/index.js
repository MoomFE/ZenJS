import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import { autoGetPredicate } from "../../../shared/util/getPredicate";


defineValue( ArrayProto, '$inArray', function( value, predicate ){

  let index = 0,
      length = this.length;

  const args = autoGetPredicate( arguments, value, 1 );

  value = args[ 0 ];
  predicate = args[ 1 ];

  for( ; index < length; index++ ){
    if( predicate( this[ index ], value ) ){
      return true;
    }
  }

  return false;
});