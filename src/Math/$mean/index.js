import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import $toArray from "../../Array/$toArray/index";


export default function $mean(){

  return $toArray( arguments )
              .reduce( ( count, next ) => count + next )
        /
        arguments.length;
}

defineValue( Math, '$mean', $mean );