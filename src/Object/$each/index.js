import defineValue from '../../shared/util/defineValue';
import Object from '../../shared/global/Object';


export default function $each( obj, callback ){
  let key,
      value;

  for( key in obj ){
    value = obj[ key ];

    if( callback.call( value, key, value, obj ) === false ){
      break;
    }
  }

  return obj;
}

defineValue( Object, '$each', $each );