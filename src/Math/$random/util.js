import random from "../../shared/global/Math/random";
import floor from "../../shared/global/Math/floor";
import parametersDefault from "../../shared/util/parametersDefault";

export function _randomParameters( args ){
  let from = parametersDefault( args, 0, 9 ),
      to = parametersDefault( args, 1, 0 );
  
  if( from > to ){
    [ from, to ] = [ to, from ];
  }

  return [ from, to ];
}

export function _random( from, to ){
  return floor(
    random() * ( to - from + 1 ) + from
  );
}