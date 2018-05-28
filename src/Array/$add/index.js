import defineValue from '../../shared/util/defineValue';
import ArrayProto from '../../shared/global/Array/prototype/index';
import parametersRest from '../../shared/util/parametersRest';


function $add( index ){
  let i = 0;
  const
    args = parametersRest( arguments, 1 ),
    len = args.length;

  for( ; i < len; i++){
    this.splice( index++, 0, args[ i ] );
  }

  return this;
}

defineValue( ArrayProto, '$add', $add );