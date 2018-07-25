import defineValue from '../../../shared/util/defineValue';
import ArrayProto from '../../../shared/global/Array/prototype/index';
import parametersRest from '../../../shared/util/parametersRest';
import fixArrayIndex from '../../../shared/util/fixArrayIndex';


export default function $add( self, index, args ){

  const len = args.length;
  let i = 0;

  index = fixArrayIndex( self, index, 1 );

  for( ; i < len; i++ ){
    self.splice( index++, 0, args[ i ] );
  }

  return self;
}

defineValue( ArrayProto, '$add', function( index ){
  return $add( this, index, parametersRest( arguments, 1 ) );
});