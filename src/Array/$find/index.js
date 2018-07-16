import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import findIndex from "../$findIndex/index";


defineValue( ArrayProto, '$find', function( key ){
  let index = findIndex( this, key, arguments );

  return index === -1 ? null
                      : this[ index ];
});