/**
 * 获取方法指定位参数, 若未传入参数, 则取默认值
 * @param {IArguments} args arguments
 * @param {Number} index 需要在 arguments 中取得默认值的下标
 * @param {Object} defaultValue 若未传入值时取得默认值
 */
export default function parametersDefault( args, index, defaultValue ){
  let arg;

  if( args.length > index && ( arg = args[ index ] ) !== undefined ){
    return arg;
  }
  return defaultValue;
}