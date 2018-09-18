import defineValue from "../../../shared/util/defineValue";
import root from "../../../shared/const/root";
import { isArray } from "../../../shared/const/type";


defineValue( root, '$typeof', function( obj ){
  if( obj == null ) return obj + '';
  return obj[ isArray ] ? 'array'
                        : typeof obj;
});