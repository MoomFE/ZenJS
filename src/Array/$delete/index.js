import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";

export default function $delete( index, num = 1 ){
  this.splice( index, num );
  return this;
}

defineValue( ArrayProto, '$delete', $delete );