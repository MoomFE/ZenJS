import getDecimalLength from "../../shared/util/getDecimalLength";
import defineValue from "../../shared/util/defineValue";
import Math from "../../shared/global/Math/index";
import slice from "../../shared/global/Array/prototype/slice";
import pow from "../../shared/global/Math/pow";
import max from "../../shared/global/Math/max";
import Number from "../../shared/global/Number/index";
import returnArg from "../../shared/util/returnArg";
import repeat from "../../shared/polyfill/repeat";


// add subtract multiply divide
export function $plus( num1, num2 ){
  return handler( num1, num2, plus );
}

defineValue( Math, '$plus $jia', $plus );

function plus( num1, num2 ){
  return num1 + num2;
}

export function handler( num1, num2, handlerFn, lastHandlerFn ){
  const decimal1 = getDecimalLength( num1 = num1 || 0 );
  const decimal2 = getDecimalLength( num2 = num2 || 0 );
  const maxDecimal = max( decimal1, decimal2 );
  const exponent = maxDecimal ? pow( 10, maxDecimal )
                              : 1;

  if( maxDecimal ){
    num1 = integer( num1, decimal1, maxDecimal );
    num2 = integer( num2, decimal2, maxDecimal );
  }

  const count = handlerFn( num1, num2 );

  if( lastHandlerFn ){
    return lastHandlerFn( count, exponent );
  }

  return count / exponent;
}

/**
 * 将传入数字乘以一定的倍数, 不使用乘法的方式, 防止出现乘法精度不准的问题
 * @param {Number} num 需要处理的数字
 * @param {Number} decimal 当前数字的小数位
 * @param {Number} maxDecimal 最大小数位
 */
function integer( num, decimal, maxDecimal ){
  num = ( '' + num ).replace( '.', '' );

  if( decimal !== maxDecimal ){
    num += repeat( '0', maxDecimal - decimal );
  }

  return Number( num );
}