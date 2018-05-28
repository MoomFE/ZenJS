import defineValue from "../../shared/util/defineValue";
import ObjectProto from "../../shared/global/Object/prototype/index";
import defineGet from "../../shared/util/defineGet";

function $self(){
  return this;
}

defineValue( ObjectProto, '$self', $self );
defineGet( ObjectProto, '__self__', $self );