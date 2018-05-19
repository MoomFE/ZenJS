import { _random, _randomParameters } from "./util";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";

export default function $random(){
  const cache = _randomParameters( arguments );

  return _random(
    cache[ 0 ], cache[ 1 ]
  );
}

defineValue( Math, '$random', $random );