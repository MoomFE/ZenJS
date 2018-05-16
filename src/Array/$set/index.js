import isObject from '../../shared/util/isObject';
import define from '../../shared/util/defineValue';
import ArrayProto from '../../shared/global/Array/prototype/index';


export default function $set( index, value ){
  if( isObject( index ) )
    for( let i in index )
      this[ i ] = index[ i ];
  else
    this[ index ] = value;

  return this;
}

define( ArrayProto, '$set', $set );