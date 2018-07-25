import { handler } from "../$plus/index";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";


export function $divide( num1, num2 ){
  return handler( num1, num2, divide, lastHandler );
}

defineValue( Math, '$divide $chu', $divide );

function divide( num1, num2 ){
  return num1 / num2;
}

function lastHandler( count ){
  return count;
}