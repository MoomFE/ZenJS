import defineValue from "../../../shared/util/defineValue";
import extend from "../../../shared/util/extend";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import slice from "../../../shared/global/Array/prototype/slice";


[ '$extend', '$assign' ].forEach(( name, index ) => {

  defineValue( Object, name, function(){
    return extend( index, arguments );
  });

  defineValue( ObjectProto, name, function(){
    return extend(
      index, [ this ].concat(
        slice.call( arguments )
      )
    );
  });

});