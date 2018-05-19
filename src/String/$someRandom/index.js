import string$random from "../$random/index";
import $random from "../../Math/$random/index";
import random from "../../shared/global/Math/random";
import defineValue from "../../shared/util/defineValue";
import String from "../../shared/global/String/index";
import parametersDefault from "../../shared/util/parametersDefault";

export default function string$someRandom(){
  let
    result = '',
    length = parametersDefault( arguments, 0, 12 );
  const
    hasUppercase = parametersDefault( arguments, 1, false ),
    hasNumber = parametersDefault( arguments, 2, false );

  while( length-- > 0 ){
    result += string$random();
  }

  if( hasUppercase ){
    result = result
      .split('')
      .map( code => $random( 1 ) ? code.toUpperCase() : code )
      .join();
  }

  if( hasNumber ){
    result = result
      .split('')
      .map( code => $random( 1 ) ? random() : code )
      // 第一位不允许为数字
      .$set(
        0,
        string$random( $random( 1 ) )
      )
      .join();
  }

  return result;
}

defineValue( String, '$someRandom', string$someRandom );