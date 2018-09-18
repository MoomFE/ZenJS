import defineValue from "../../../shared/util/defineValue";
import ObjectProto from "../../../shared/global/Object/prototype/index";


function self(){
  return this;
}

defineValue( ObjectProto, '$self', self );