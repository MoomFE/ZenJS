import defineValue from "../../shared/util/defineValue";
import ObjectProto from "../../shared/global/Object/prototype/index";

export default function $get( key ){
  return this[ key ];
}

defineValue( ObjectProto, '$get', $get );