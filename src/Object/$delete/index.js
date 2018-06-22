import defineValue from "../../shared/util/defineValue";
import ObjectProto from "../../shared/global/Object/prototype/index";
import $toArray from "../../Array/$toArray/index";


defineValue( ObjectProto, '$delete', function $delete(){
  $toArray( arguments ).$each( key => {
    delete this[ key ];
  });
  return this;
});