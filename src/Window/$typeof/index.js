import isArray from '../../shared/global/Array/isArray';
import define from '../../shared/util/defineValue';


export default function $typeof( obj ){
  let type;

  if( obj == null ) return obj + '';
  if( ( type = typeof obj ) === 'object' ){
    if( isArray( obj ) )
      return 'array'
  }
  return type;
}

define( window, '$typeof', $typeof );