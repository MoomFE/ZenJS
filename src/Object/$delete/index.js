import "../../Array/$each/index";
import defineValue from "../../shared/util/defineValue";
import ObjectProto from "../../shared/global/Object/prototype/index";

function $delete(){
  Array.from( arguments ).$each( key => {
    delete this[ key ];
  });
  return this;
}

defineValue( ObjectProto, '$delete', $delete );