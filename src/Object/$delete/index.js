import defineValue from "../../shared/util/defineValue";
import ObjectProto from "../../shared/global/Object/prototype/index";


defineValue( ObjectProto, '$delete', function $delete(){
  Array.from( arguments ).$each( key => {
    delete this[ key ];
  });
  return this;
});