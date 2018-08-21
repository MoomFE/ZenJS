import isArrayLike from "../../../shared/util/isArrayLike";
import $each from "../../1. Array/$each/index";
import keys from "../../../shared/global/Object/keys";
import defineValue from "../../../shared/util/defineValue";
import Object from "../../../shared/global/Object/index";
import ObjectProto from "../../../shared/global/Object/prototype/index";


function each( obj, callback ){

  if( obj == null ){
    return obj;
  }

  if( isArrayLike( obj ) ){
    return $each( obj, callback );
  }

  const _keys = keys( obj ),
        length = _keys.length;
  let index = 0,
      key, value;

  for( ; index < length; index++ ){
    key = _keys[ index ];
    value = obj[ key ];

    if( callback.call( value, key, value, obj ) === false ){
      break;
    }
  }

  return obj;
}

defineValue( Object, '$each', each );

defineValue( ObjectProto, '$each', function( callback ){
  return each( this, callback );
});