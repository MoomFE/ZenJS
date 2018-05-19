import floor from "../../shared/global/Math/floor";
import random from "../../shared/global/Math/random";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import parametersDefault from "../../shared/util/parametersDefault";

export default function $random(){
  let
    from = parametersDefault( arguments, 0, 9 ),
    to = arguments[ 1 ];

  to || ( to = from, from = 0 );
  return floor(
    random() * ( to - from + 1 ) + from
  );
}

defineValue( Math, '$random', $random );