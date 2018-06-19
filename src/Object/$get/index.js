import defineValue from "../../shared/util/defineValue";
import ObjectProto from "../../shared/global/Object/prototype/index";


defineValue( ObjectProto, '$get', function( key ){
  return this[ key ];
});