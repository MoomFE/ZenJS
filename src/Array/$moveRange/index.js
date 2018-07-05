import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import $add from "../$add/index";


defineValue( ArrayProto, '$moveRange', function( start, moveCount, toIndex ){
  return $add(
    this,
    toIndex,
    this.splice( start, moveCount )
  );
});

// defineValue( ArrayProto, '$moveRange2', function( start, moveCount, toIndex ){
  
// });