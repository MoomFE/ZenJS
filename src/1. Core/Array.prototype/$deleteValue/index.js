import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import getPredicate from "../../../shared/util/getPredicate";


defineValue( ArrayProto, '$deleteValue $removeValue', function( value, predicate ){

  let length = this.length,
      index;

  if( !length ){
    return this;
  }

  predicate = getPredicate( predicate );

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