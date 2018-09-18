import defineValue from "../../../shared/util/defineValue";
import Math from "../../../shared/global/Math/index";
import parametersDefault from "../../../shared/util/parametersDefault";
import intRandom from "../../../shared/util/intRandom";
import abs from "../../../shared/global/Math/abs";


defineValue( Math, '$random', function(){
  const args = arguments;

  let from = parametersDefault( args, 0, 0 );
  let to = args.length !== 1 ? parametersDefault( args, 1, 9 )
                             : 0;

  if( from > to ){
    [ from, to ] = [ to, from ];
  }

  if( from > 0 ){
    return intRandom( from, to );
  }

  let result = intRandom( 0, to + abs( from ) );

  return result > to ? to - result
                     : result;
});