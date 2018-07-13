import { handler, handlerPlus } from "../$add/index";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import pow from "../../shared/global/Math/pow";
import { $multiply } from "../$multiply/index";


export function $divide( num1, num2 ){
  return handler( num1, num2, divide, lastHandler );
}

export function $dividePlus(){
  return handlerPlus( arguments, divide, lastHandler );
}

defineValue( Math, {
  $divide,
  $dividePlus
});

function divide( num1, num2 ){
  return num1 / num2;
}

function lastHandler( num, exponent, numCount ){
  const dividend = numCount ? pow( exponent, numCount - 1 )
                            : exponent;
  return $multiply( num, dividend );
}