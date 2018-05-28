import isObject from "../../shared/util/isObject";
import defineValue from "../../shared/util/defineValue";
import ObjectProto from "../../shared/global/Object/prototype/index";

function $set( key, value ){
  let _key;

  if( isObject( key ) )
    for( _key in key )
      this[ _key ] = key[ _key ];
  else
    this[ key ] = value;
  
  return this;
}

defineValue( ObjectProto, '$set', $set );