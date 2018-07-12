import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import slice from "../../shared/global/Array/prototype/slice";
import pow from "../../shared/global/Math/pow";
import max from "../../shared/global/Math/max";


function GetDecimalLength( num ){
  return ( ( '' + num ).split('.')[1] || '' ).length
}

export function $add( num1, num2 ){
  const decimal1 = GetDecimalLength( num1 );
  const decimal2 = GetDecimalLength( num2 );
  const exponent = pow( 10, max( decimal1, decimal2 ) );
  
  return ( num1 * exponent + num2 * exponent ) / exponent;
}

export function $addPlus(){
  const nums = slice.call( arguments );
  const exponent = pow(
    10,
    max.apply(
      null,
      nums.map( num => GetDecimalLength( num ) )
    )
  );

  return nums.map( num => num * exponent )
             .reduce(( count, next ) => count + next )
         /
         exponent;
}

defineValue( Math, {
  $add,
  $addPlus
});