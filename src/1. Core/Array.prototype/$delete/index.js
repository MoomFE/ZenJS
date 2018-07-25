import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";


defineValue( ArrayProto, '$delete $remove', function( index, noop, returnDeleted ){
  const num = parametersDefault( arguments, 1, 1 );
  const deleted = this.splice( index, num );

  return returnDeleted ? deleted
                       : this;
});