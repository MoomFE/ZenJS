import defineValue from "../../../shared/util/defineValue";
import assign from "../../../shared/util/assign";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import slice from "../../../shared/global/Array/prototype/slice";


[ '$assign', '$assignDeep' ].forEach(( name, index ) => {

  defineValue( Object, name, function(){
    return assign( index, arguments );
  });

  defineValue( ObjectProto, name, function(){
    return assign(
      index, [ this ].concat(
        slice.call( arguments )
      )
    );
  });

});