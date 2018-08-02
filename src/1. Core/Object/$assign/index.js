import defineValue from "../../../shared/util/defineValue";
import Object from "../../../shared/global/Object/index";
import extend from "../../../shared/util/extend";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import slice from "../../../shared/global/Array/prototype/slice";


defineValue( Object, '$assign $extend', extend );

defineValue( ObjectProto, '$extend', function(){
  return extend.apply(
    null,
    [ this ].concat(
      slice.call( arguments )
    )
  );
});