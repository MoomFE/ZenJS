import defineValue from '../../shared/util/defineValue';
import ArrayProto from '../../shared/global/Array/prototype/index';


defineValue( ArrayProto, '$inArray', function( obj ){
  let i = 0,
      len = this.length;

  for( ; i < len; i++ )
    if( this[ i ] == obj ) return true;
  return false;
});