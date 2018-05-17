import isObject from '../../shared/util/isObject';
import defineValue from '../../shared/util/defineValue';
import ArrayProto from '../../shared/global/Array/prototype/index';


export default function $set( index, value ){
  let _index;

  if( isObject( index ) )
    for( _index in index )
      this[ _index ] = index[ _index ];
  else
    this[ index ] = value;

  return this;
}

defineValue( ArrayProto, '$set', $set );