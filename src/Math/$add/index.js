import getDecimalLength from "../../shared/util/getDecimalLength";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import slice from "../../shared/global/Array/prototype/slice";
import pow from "../../shared/global/Math/pow";
import max from "../../shared/global/Math/max";


export function $add( num1, num2 ){
  return handler( num1, num2, add );
}

export function $addPlus(){
  return handlerPlus( arguments, add );
}

defineValue( Math, {
  $add,
  $addPlus
});

function add( num1, num2 ){
  return num1 + num2;
}

export function handler( num1, num2, handlerFn ){
  const decimal1 = getDecimalLength( num1 );
  const decimal2 = getDecimalLength( num2 );
  const exponent = pow( 10, max( decimal1, decimal2 ) + 1 );

  return handlerFn( num1 * exponent, num2 * exponent ) / exponent
}

export function handlerPlus( args, reduceFn ){
  const nums = slice.call( args );
  const exponent = pow(
    10,
    max.apply(
      null,
      nums.map( num => getDecimalLength( num ) )
    ) + 1
  );

  return nums.map( num => num * exponent )
             .reduce( reduceFn )
         /
         exponent;
}