import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import getPredicate from "../../../shared/util/getPredicate";
import parametersDefault from "../../../shared/util/parametersDefault";
import isFunction from "../../../shared/util/isFunction";
import congruence from "../../../shared/util/congruence";


defineValue( ArrayProto, '$deleteValue $removeValue', function( value ){

  let length = this.length,
      index,
      predicate;

  if( !length ){
    return this;
  }

  if( arguments.length > 1 ){
    predicate = getPredicate(
      parametersDefault( arguments, 1, true )
    );
  }else if( isFunction( value ) ){
    predicate = value;
    value = undefined;
  }else{
    predicate = congruence;
  }

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