/**
 * 构造并返回一个新字符串, 该字符串包含被连接在一起的指定数量的字符串的副本.
 * 是 String.prototype.repeat 的降级方案
 * @param {String} str 需要重复的字符串
 * @param {Number} count 需要重复的次数
 */
export default function repeat( str, count ){
  let result = '';

  while( count-- ){
    result += str;
  }

  return result;
}