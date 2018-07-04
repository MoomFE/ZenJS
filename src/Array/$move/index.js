import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";


defineValue( ArrayProto, '$move', function( from, to ){
  this.splice(
    ( to < 0 ? this.length + to : to ),
    0,
    this.splice( from, 1 )[ 0 ]
  );
  return this;
});