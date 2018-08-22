import defineValue from "../../../shared/util/defineValue";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import isObject from "../../../shared/util/isObject";


defineValue( ObjectProto, '$set $edit', function( key, value ){

  if( isObject( key ) ){
    return this.$each(( key, value ) => {
      this[ key ] = value;
    });
  }

  this[ key ] = value;

  return this;
});