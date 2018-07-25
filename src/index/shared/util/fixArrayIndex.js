/**
 * 将一个传入的数组的下标修复到正确的位置上
 * @param {Array} array 原数组
 * @param {Number} index 传入的下标, 可为负数
 * @param {Number} add 额外值
 * @returns {Number}
 */
export default function fixArrayIndex( array, index, add ){
  if( index < 0 && ( index = array.length + index + ( add || 0 ) ) < 0 ){
    index = 0;
  }
  return index;
}