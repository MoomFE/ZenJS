import string$random from "../$random/index";
import $random from "../../Math/$random/index";
import random from "../../shared/global/Math/random";
import defineValue from "../../shared/util/defineValue";
import String from "../../shared/global/String/index";

export default function string$someRandom(
  length = 12,
  hasUppercase = false,
  hasNumber = false
){
  let result = '';

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