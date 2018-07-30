import defineValue from '../../../shared/util/defineValue';
import ArrayProto from '../../../shared/global/Array/prototype/index';
import parametersRest from '../../../shared/util/parametersRest';
import fixArrayIndex from '../../../shared/util/fixArrayIndex';


export default function $add( self, index, args ){

  const len = args.length;

  if( len < 1 ){
    return self;
  }

  index = fixArrayIndex( self, index, 1 );

  for( let i = 0; i < len; i++ ){
    self.splice( index++, 0, args[ i ] );
  }

  return self;
}

defineValue( ArrayProto, '$add', function( index ){
  return $add( this, index, parametersRest( arguments, 1 ) );
});