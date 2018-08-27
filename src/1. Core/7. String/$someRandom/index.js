import defineValue from "../../../shared/util/defineValue";
import String from "../../../shared/global/String/index";
import parametersDefault from "../../../shared/util/parametersDefault";
import stringRandom from "../$random/index";
import intRandom from "../../../shared/util/intRandom";


defineValue( String, '$someRandom', function(/* length, uppercase, number */){

  const args = arguments;
  const uppercase = parametersDefault( args, 1, false );
  const number = parametersDefault( args, 2, false );

  let result = '';
  let length = parametersDefault( args, 0, 12 );

  while( length-- > 0 ){
    // 指定了也随机大写字母, 则几率是三分之一
    // 否则只是随机小写字母及数字, 则几率是二分之一
    if( number && intRandom( 0, uppercase ? 2 : 1 ) === 0 ){
      result += intRandom( 0, 9 );
    }
    // 随机大小写字母
    else{
      result += stringRandom( uppercase && intRandom( 0, 1 ) === 0 );
    }
  }

  return result;
});