import { handler } from "../$plus/index";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import { $multiply, getDividend } from "../$multiply/index";
import getDecimalLength from "../../shared/util/getDecimalLength";


export function $divide( num1, num2 ){
  return handler( num1, num2, divide, lastHandler );
}

defineValue( Math, '$divide $chu', $divide );

function divide( num1, num2 ){
  return num1 / num2;
}

function lastHandler( num, exponent, nums ){
  const dividend = getDividend( exponent, nums );

  return getDecimalLength( num ) > 0 ? $multiply( num, dividend )
                                     : num * dividend
}