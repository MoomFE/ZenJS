/**
 * 获取传入数字的小数位长度
 * @param {Number} num
 * @returns {Number}
 */
export default function getDecimalLength( num ){
  return ( ( '' + num ).split('.')[1] || '' ).length
}