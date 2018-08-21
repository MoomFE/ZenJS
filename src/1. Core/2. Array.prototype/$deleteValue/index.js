import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import { autoGetPredicate } from "../../../shared/util/getPredicate";


defineValue( ArrayProto, '$deleteValue $removeValue', function( _value ){

  let length = this.length,
      index;

  if( !length ){
    return this;
  }

  const args = autoGetPredicate( arguments, _value, 1 );
  const value = args[ 0 ];
  const predicate = args[ 1 ];

  for( index = 0; index < length; ){
    if( predicate( this[ index ], value ) ){
      this.$delete( index );
      length--;
    }else{
      index++;
    }
  }

  return this;
});