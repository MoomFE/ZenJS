import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";


defineValue( ArrayProto, '$delete $remove', function( index ){
  const num = parametersDefault( arguments, 1, 1 );

  return this.splice( index, num ),
         this;
});