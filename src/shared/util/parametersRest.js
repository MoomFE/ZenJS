import parametersDefault from "./parametersDefault";
import $toArray from "../../Array/$toArray/index";

/**
 * 获取方法从指定位开始的剩余参数
 * @param {IArguments} args arguments
 * @param {Number} index 需要在 arguments 中开始取参数的下标 - default: 0
 */
export default function parametersRest( args ){
  const index = parametersDefault( arguments, 1, 0 );
  const length = args.length;

  if( length > index ){
    return $toArray( args ).$get( index, length );
  }
  return [];
}