import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";


export default function $mean(){

  return Array.from( arguments )
              .reduce( ( count, next ) => count + next )
        /
        arguments.length;
}

defineValue( Math, '$mean', $mean );