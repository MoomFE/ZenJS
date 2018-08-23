import defineValue from "../../../shared/util/defineValue";
import root from "../../../shared/const/root";
import { isArray } from "../../../shared/const/type";


defineValue( root, '$typeof', function( obj ){
  let type;

  if( obj == null ) return obj + '';
  if( ( type = typeof obj ) === 'object' ){
    if( obj[ isArray ] )
      return 'array';
  }
  return type;
});