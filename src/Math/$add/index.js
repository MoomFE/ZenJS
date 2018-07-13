import getDecimalLength from "../../shared/util/getDecimalLength";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import slice from "../../shared/global/Array/prototype/slice";
import pow from "../../shared/global/Math/pow";
import max from "../../shared/global/Math/max";
import Number from "../../shared/global/Number/index";


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
  const decimal1 = getDecimalLength( num1 = num1 || 0 );
  const decimal2 = getDecimalLength( num2 = num2 || 0 );
  const maxDecimal = max( decimal1, decimal2 );
  const exponent = maxDecimal ? pow( 10, maxDecimal )
                              : 1;
  
  if( maxDecimal ){
    num1 = integer( num1, decimal1, maxDecimal );
    num2 = integer( num2, decimal2, maxDecimal );
  }

  return handlerFn( num1, num2, exponent ) / exponent;
}

export function handlerPlus( args, reduceFn ){
  let nums = slice.call( args ).map( num => num || 0 );
  const decimals = nums.map( num => getDecimalLength( num ) );
  const maxDecimal = max.apply( null, decimals );
  const exponent = maxDecimal ? pow( 10, maxDecimal )
                              : 1;

  if( maxDecimal ){
    nums = nums.map(( num, index ) => {
      return integer( num, decimals[ index ], maxDecimal );
    });
  }

  return nums.reduce(( count, next ) => {
    return reduceFn( count, next, exponent );
  })
         /
         exponent;
}

function integer( num, decimal, maxDecimal ){
  num = ( '' + num ).replace( '.', '' );

  if( decimal !== maxDecimal ){
    num += '0'.repeat( maxDecimal - decimal );
  }

  return Number( num );
}