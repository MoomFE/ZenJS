import defineValue from '../../shared/util/defineValue';
import ArrayProto from '../../shared/global/Array/prototype/index';


export default function $inArray( obj ){
  let i = 0,
      len = this.length;

  for( ; i < len; i++ )
    if( this[ i ] == obj ) return true;
  return false;
}

defineValue( ArrayProto, '$inArray', $inArray );