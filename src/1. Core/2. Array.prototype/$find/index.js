import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import findIndex from "../$findIndex/index";


defineValue( ArrayProto, '$find', function( predicate, key ){
  let index = findIndex( this, predicate, key, arguments );

  return index === -1 ? null
                      : this[ index ];
});