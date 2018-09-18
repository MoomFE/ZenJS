import create from "./createArray";
import ceil from "../global/Math/ceil";


/**
 * 创建一个新的数组, 将传入数组按照指定的长度进行分割, 如果数组不能均分, 则最后的数组中是数组剩余的元素
 * @param array 需要进行分割的数组
 * @param size 分割的长度
 */
export default function chunk( array, size ){
  let length;

  if( !array || size < 1 || !( length = array.length ) ){
    return [];
  }

  return create( ceil( length / size ), index => {
    const start = index * size;
    return array.slice( start, start + size );
  });
}