import defineValue from "../../../shared/util/defineValue";
import assign from "../../../shared/util/assign";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import slice from "../../../shared/global/Array/prototype/slice";
import parametersRest from "../../../shared/util/parametersRest";
import isBoolean from "../../../shared/util/isBoolean";


defineValue( Object, '$assign', function( shallow ){
  if( isBoolean( shallow ) ){
    return assign( shallow, parametersRest( arguments, 1 ) );
  }
  return assign( false, arguments );
});

defineValue( ObjectProto, '$assign', function( shallow ){
  if( isBoolean( shallow ) ){
    return assign( shallow, [ this ].concat(
      parametersRest( arguments, 1 )
    ));
  }
  return assign( false, [ this ].concat(
    slice.call( arguments )
  ));
});