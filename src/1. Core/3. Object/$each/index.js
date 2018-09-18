import keys from "../../../shared/global/Object/keys";
import defineValue from "../../../shared/util/defineValue";
import Object from "../../../shared/global/Object/index";
import ObjectProto from "../../../shared/global/Object/prototype/index";


export default function each( obj, callback ){

  if( obj == null ){
    return obj;
  }

  const oKeys = keys( obj ),
        length = oKeys.length;
  let index = 0, key, value;

  for( ; index < length; index++ ){
    key = oKeys[ index ];
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