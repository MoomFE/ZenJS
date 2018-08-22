import defineValue from "../../../shared/util/defineValue";
import Math from "../../../shared/global/Math/index";
import parametersDefault from "../../../shared/util/parametersDefault";
import floor from "../../../shared/global/Math/floor";
import random from "../../../shared/global/Math/random";
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

function intRandom( from, to ){
  return floor(
    random() * ( to - from + 1 ) + from
  );
}