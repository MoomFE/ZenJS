import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import parametersDefault from "../../shared/util/parametersDefault";

export default function $get(){
  const
    index = parametersDefault( arguments, 0, 0 ),
    num = arguments[ 1 ];

  if( num == null ){
    return this[ index ];
  }
  return this.slice( index, num );
}

defineValue( ArrayProto, '$get', $get );