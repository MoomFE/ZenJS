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

function lastHandler( count, exponent ){
  return count / pow( exponent, 2 );
}