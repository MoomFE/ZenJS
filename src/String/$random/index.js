import fromCharCode from "../../shared/global/String/fromCharCode";
import $random from '../../Math/$random/index';
import defineValue from "../../shared/util/defineValue";
import String from "../../shared/global/String/index";

export default function string$random( uppercase = false ){
  return fromCharCode(
    uppercase ? $random( 65, 90 ) : $random( 97, 122 )
  );
}

defineValue( String, '$random', string$random );