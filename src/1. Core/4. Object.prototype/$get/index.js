import defineValue from "../../../shared/util/defineValue";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import slice from "../../../shared/global/Array/prototype/slice";


defineValue( ObjectProto, '$get', function( key ){

  if( arguments.length < 2 ){
    return this[ key ];
  }

  const result = {};

  slice.call( arguments ).forEach( key => {
    result[ key ] = this[ key ];
  });

  return result;
});