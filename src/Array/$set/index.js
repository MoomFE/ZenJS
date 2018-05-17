import isObject from '../../shared/util/isObject';
import defineValue from '../../shared/util/defineValue';
import ArrayProto from '../../shared/global/Array/prototype/index';


export default function $set( index, value ){
  if( isObject( index ) )
    for( let i in index )
      this[ i ] = index[ i ];
  else
    this[ index ] = value;

  return this;
}

defineValue( ArrayProto, '$set', $set );