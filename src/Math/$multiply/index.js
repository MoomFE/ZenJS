import { handler } from "../$plus/index";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import pow from "../../shared/global/Math/pow";


export function $multiply( num1, num2 ){
  return handler( num1, num2, multiply, lastHandler );
}

defineValue( Math, '$multiply $cheng', $multiply );

function multiply( num1, num2 ){
  return num1 * num2;
}

function lastHandler( num, exponent, nums ){
  return num /
         getDividend( exponent, nums );
}

export function getDividend( exponent, nums ){
  return nums ? pow( exponent, nums.length - 1 )
              : exponent;
}