import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import $add from "../$add/index";
import fixArrayIndex from "../../../shared/util/fixArrayIndex";


defineValue( ArrayProto, '$moveRange', function( start, moveCount, toIndex ){
  return $add(
    this,
    fixArrayIndex( this, toIndex ),
    this.splice( start, moveCount )
  );
});