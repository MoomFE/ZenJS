import defineValue from "../../../shared/util/defineValue";
import Math from "../../../shared/global/Math/index";
import getDecimalLength from "../../../shared/util/getDecimalLength";
import max from "../../../shared/global/Math/max";
import pow from "../../../shared/global/Math/pow";
import repeat from "../../../shared/util/repeat";
import NumberProto from "../../../shared/global/Number/prototype/index";


function defineOperation( name, handlerFn ){
  defineValue( Math, name, handlerFn );
  defineValue( NumberProto, name, function( num ){
    return handlerFn( this, num );
  });
}

/**
 * 
 * @param {Number} num1 
 * @param {Number} num2 
 * @param {Function} handlerFn 
 * @param {Function} lastHandlerFn 
 */
function handler( num1, num2, handlerFn, lastHandlerFn ){
  const decimal1 = getDecimalLength( num1 = num1 || 0 );
  const decimal2 = getDecimalLength( num2 = num2 || 0 );
  const maxDecimal = max( decimal1, decimal2 );
  const exponent = maxDecimal ? pow( 10, maxDecimal )
                              : 1;

  if( maxDecimal ){
    num1 = integer( num1, decimal1, maxDecimal );
    num2 = integer( num2, decimal2, maxDecimal );
  }

  const result = handlerFn( num1, num2 );

  if( lastHandlerFn ){
    return lastHandlerFn( result, exponent );
  }

  return result / exponent;
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

// add
defineOperation( '$jia $add', $add );
export function $add( num1, num2 ){
  return handler( num1, num2, ( num1, num2 ) => num1 + num2 );
}

// subtract
defineOperation( '$jian $subtract', ( num1, num2 ) => {
  return handler( num1, num2, ( num1, num2 ) => num1 - num2 );
});

// multiply
defineOperation( '$cheng $multiply', ( num1, num2 ) => {
  return handler(
    num1, num2,
    ( num1, num2 ) => num1 * num2,
    ( result, exponent ) => result / pow( exponent, 2 )
  );
});

// divide
defineOperation( '$chu $divide', $divide );
export function $divide( num1, num2 ){
  return handler(
    num1, num2,
    ( num1, num2 ) => num1 / num2,
    ( result ) => result
  );
}