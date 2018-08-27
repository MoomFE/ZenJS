import parametersDefault from "../../../shared/util/parametersDefault";
import fromCharCode from "../../../shared/global/String/fromCharCode";
import intRandom from "../../../shared/util/intRandom";
import defineValue from "../../../shared/util/defineValue";
import String from "../../../shared/global/String/index";


export default function stringRandom(/* uppercase */){
  const uppercase = parametersDefault( arguments, 0, false );

  return fromCharCode(
    uppercase ? intRandom( 65, 90 ) : intRandom( 97, 122 )
  );
}

defineValue( String, '$random', stringRandom );