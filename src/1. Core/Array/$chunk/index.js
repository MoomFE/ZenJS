import defineValue from "../../../shared/util/defineValue";
import Array from "../../../shared/global/Array/index";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import chunk from "../../../shared/util/chunk";


defineValue( Array, '$chunk', chunk );

defineValue( ArrayProto, '$chunk', function( size ){
  return chunk( this, size );
});