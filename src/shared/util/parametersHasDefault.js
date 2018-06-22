/**
 * 判断方法指定位参数是否传值
 * @param {IArguments} args arguments
 * @param {Number} index 需要在 arguments 中判断默认值得下标
 */
export default function parametersHasDefault( args, index ){
  return args.length > index && args[ index ] !== undefined;
}