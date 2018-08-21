import equals from "./equals";
import congruence from "./congruence";
import isFunction from "./isFunction";
import parametersDefault from "./parametersDefault";


/**
 * 返回一个可以判断两个值的方法.
 * 如果传入值为 Function 类型, 说明是用户传的方法, 则直接返回;
 * 如果传入值不为 Function 类型, 则值是真值, 则返回全等判断方法, 否则返回双等判断方法
 * 
 * @param {*} predicate 
 */
export function getPredicate( predicate ){
  if( isFunction( predicate ) ){
    return predicate;
  }
  return predicate ? congruence : equals;
}


export function autoGetPredicate( args, value, predicateIndex, predicate ){

  if( args.length > 1 ){
    predicate = getPredicate(
      parametersDefault( args, predicateIndex, true )
    );
  }else if( isFunction( value ) ){
    predicate = value;
    value = undefined;
  }else{
    predicate = congruence;
  }

  return [ value, predicate ];
}