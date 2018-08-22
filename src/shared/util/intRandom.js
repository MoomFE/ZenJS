import floor from "../global/Math/floor";
import random from "../global/Math/random";


/**
 * 在传入的两个正整数中随机一个数字
 * @param {Number} from 
 * @param {Number} to 
 */
export default function intRandom( from, to ){
  return floor(
    random() * ( to - from + 1 ) + from
  );
}