import { handler, handlerPlus } from "../$add/index";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";

export function $minus( num1, num2 ){
  return handler( num1, num2, minus );
}

export function $minusPlus(){
  return handlerPlus( arguments, minus );
}

defineValue( Math, {
  $minus,
  $minusPlus
});

function minus( num1, num2 ){
  return num1 - num2;
}