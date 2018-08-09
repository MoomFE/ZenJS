import { $isNumber } from "./isNumber";

/**
 * 将一个传入的数组的下标修复到正确的位置上,
 * 下标不是数字则返回 0,
 * 下标为负数, 则计算出在数组中应有的下标,
 * 下标为负数且计算完后的下标依旧小于 0, 则返回 0
 * 
 * @param {Array} array 原数组
 * @param {Number} index 传入的下标, 可为负数
 * @param {Number} add 额外值
 * @returns {Number}
 */
export default function fixArrayIndex( array, index, add ){
  if( !$isNumber( index ) || ( index < 0 && ( index = array.length + index + ( add || 0 ) ) < 0 ) ){
    index = 0;
  }
  return index;
}