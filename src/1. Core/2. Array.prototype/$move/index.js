import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import fixArrayIndex from "../../../shared/util/fixArrayIndex";


defineValue( ArrayProto, '$move', function( from, to ){
  this.splice(
    fixArrayIndex( this, to ),
    0,
    this.splice( from, 1 )[ 0 ]
  );
  return this;
});