import { handler, handlerPlus } from "../$add/index";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import pow from "../../shared/global/Math/pow";


export function $multiply( num1, num2 ){
  return handler( num1, num2, multiply, lastHandler );
}

export function $multiplyPlus(){
  return handlerPlus( arguments, multiply, lastHandler );
}

defineValue( Math, {
  $multiply,
  $multiplyPlus
});

function multiply( num1, num2 ){
  return num1 * num2;
}

function lastHandler( num, exponent, numCount ){
  const dividend = numCount ? pow( exponent, numCount - 1 )
                            : exponent;
  return num / dividend;
}