import floor from "../../shared/global/Math/floor";
import random from "../../shared/global/Math/random";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";

export default function $random( from = 9, to ){
  to || ( to = from, from = 0 );
  return floor(
    random() * ( to - from + 1 ) + from
  );
}

defineValue( Math, '$random', $random );