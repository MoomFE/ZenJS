import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";

export default function $delete( index ){
  const num = parametersDefault( arguments, 1, 1 );

  return this.splice( index, num ),
         this;
}

defineValue( ArrayProto, '$delete', $delete );