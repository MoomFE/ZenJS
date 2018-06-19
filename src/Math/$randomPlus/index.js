import abs from "../../shared/global/Math/abs";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import { _random, _randomParameters } from "../$random/util";


export default function $randomPlus(){
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

defineValue( Math, '$randomPlus', $randomPlus );