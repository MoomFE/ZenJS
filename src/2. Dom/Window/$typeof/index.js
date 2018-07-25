import isArray from '../../shared/global/Array/isArray';
import defineValue from '../../shared/util/defineValue';
import root from '../../shared/const/root';


export default function $typeof( obj ){
  let type;

  if( obj == null ) return obj + '';
  if( ( type = typeof obj ) === 'object' ){
    if( isArray( obj ) )
      return 'array'
  }
  return type;
}

defineValue( root, '$typeof', $typeof );