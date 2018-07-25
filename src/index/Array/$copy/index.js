import defineValue from "../../shared/util/defineValue";
import Array from "../../shared/global/Array/index";


defineValue( Array, '$copy', function( source, array ){
  return array ? array.concat( source )
               : source.slice();
});