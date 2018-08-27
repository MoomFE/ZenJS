import defineValue from "../../../shared/util/defineValue";
import Math from "../../../shared/global/Math/index";
import slice from "../../../shared/global/Array/prototype/slice";
import { $add } from "../$add/index";


defineValue( Math, '$mean', function(){
  const count = slice.call( arguments ).reduce(( count, next ) => {
    return $add( count, next );
  });

  return count / arguments.length;
});