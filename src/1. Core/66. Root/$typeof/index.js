import defineValue from "../../../shared/util/defineValue";
import root from "../../../shared/const/root";
import isArray from "../../../shared/global/Array/isArray";


defineValue( root, '$typeof', function( obj ){
  if( obj == null ) return obj + '';
  return isArray( obj ) ? 'array'
                        : typeof obj;
});