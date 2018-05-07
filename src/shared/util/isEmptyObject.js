/**
 * 判断传入对象是否是空对象
 * @param {Object} obj 需要判断的对象
 */
export default function isEmptyObject( obj ){
  for( let a in obj ) return false;
  return true;
}