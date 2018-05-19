/**
 * 获取方法指定位参数, 若未传入参数, 则取默认值
 * @param {Object} args arguments
 * @param {Number} index
 * @param {Object} defaultValue
 */
export default function parametersDefault( args, index, defaultValue ){
  let arg;

  if( args.length > index && ( arg = args[ index ] ) !== undefined ){
    return arg;
  }
  return defaultValue;
}