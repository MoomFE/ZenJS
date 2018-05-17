import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";

export default function $get( index = 0, num ){
  if( num == null ){
    return this[ index ];
  }
  return this.slice( index, num );
}

defineValue( ArrayProto, '$get', $get );