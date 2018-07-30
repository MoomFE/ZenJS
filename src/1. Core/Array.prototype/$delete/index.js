import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";
import parametersDefault from "../../../shared/util/parametersDefault";
import fixArrayIndex from "../../../shared/util/fixArrayIndex";


defineValue( ArrayProto, '$delete $remove', function( index, noop, returnDeleted ){

  const length = this.length;

  if( ( index = fixArrayIndex( this, index ) ) >= length ){
    index = length - 1;
  }

  const num = parametersDefault( arguments, 1, 1 );
  const deleted = this.splice( index, num );

  return returnDeleted ? deleted
                       : this;
});