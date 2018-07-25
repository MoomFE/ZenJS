/**
 * 获取方法指定位参数, 若未传入参数, 则取默认值
 * @param {IArguments} args arguments
 * @param {Number} index 需要在 argument 中取得默认值的下标
 * @param {any} defaultValue 若未传入值时取得默认值
 * @returns {any}
 */
export default function parametersDefault( args, index, defaultValue ){
  var arg;

  if (args.length > index && (arg = args[index]) !== undefined) {
    return arg;
  }
  return defaultValue;
}