import isArray from '../../shared/global/Array/isArray';
import defineValue from '../../shared/util/defineValue';
import inBrowser from '../../shared/const/inBrowser';


export default function $typeof( obj ){
  let type;

  if( obj == null ) return obj + '';
  if( ( type = typeof obj ) === 'object' ){
    if( isArray( obj ) )
      return 'array'
  }
  return type;
}

inBrowser && defineValue( window, '$typeof', $typeof );