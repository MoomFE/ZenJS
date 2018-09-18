import defineValue from "../../../shared/util/defineValue";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import isObject from "../../../shared/util/isObject";
import each from "../../3. Object/$each/index";


defineValue( ObjectProto, '$set $edit', function( key, value ){

  if( isObject( key ) ){
    each( key, ( key, value ) => {
      this[ key ] = value;
    });
    return this;
  }

  this[ key ] = value;

  return this;
});