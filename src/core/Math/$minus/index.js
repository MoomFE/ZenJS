import { handler } from "../$plus/index";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";

export function $minus( num1, num2 ){
  return handler( num1, num2, minus );
}

defineValue( Math, '$minus $jian', $minus );

function minus( num1, num2 ){
  return num1 - num2;
}