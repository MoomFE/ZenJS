import random from "../../shared/global/Math/random";
import floor from "../../shared/global/Math/floor";
import abs from "../../shared/global/Math/abs";
import parametersDefault from "../../shared/util/parametersDefault";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";


export function $random(){
  const cache = _randomParameters( arguments );

  return _random(
    cache[ 0 ], cache[ 1 ]
  );
}


export function $randomPlus(){
  let cache = _randomParameters( arguments );
  const
    from = cache[ 0 ],
    to = cache[ 1 ];

  if( from > 0 ){
    return _random( from, to );
  }else{
    cache = _random( 0, to + abs( from ) );

    return cache > to ? to - cache
                      : cache;
  }
}

defineValue( Math, {
  $random,
  $randomPlus
});

function _randomParameters( args ){
  let from = parametersDefault( args, 0, 9 ),
      to = parametersDefault( args, 1, 0 );

  return from > to ? [ to, from ]
                   : [ from, to ];
}

function _random( from, to ){
  return floor(
    random() * ( to - from + 1 ) + from
  );
}