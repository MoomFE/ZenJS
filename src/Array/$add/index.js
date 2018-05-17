import defineValue from '../../shared/util/defineValue';
import ArrayProto from '../../shared/global/Array/prototype/index';


export default function $add( index, ...args ){
  let i = 0,
      len = args.length;
  
  for( ; i < len; i++){
    this.splice( index++, 0, args[ i ] );
  }

  return this;
}

defineValue( ArrayProto, '$add', $add );