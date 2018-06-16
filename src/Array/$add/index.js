import defineValue from '../../shared/util/defineValue';
import ArrayProto from '../../shared/global/Array/prototype/index';
import parametersRest from '../../shared/util/parametersRest';


defineValue( ArrayProto, '$add', function( index ){
  let i = 0;
  const
    args = parametersRest( arguments, 1 ),
    len = args.length;
  
  if( index < 0 ){
    index = this.length + index + 1;
  }

  for( ; i < len; i++ ){
    this.splice( index++, 0, args[ i ] );
  }

  return this;
});