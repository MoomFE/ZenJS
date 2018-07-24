import ZenJS from "../../shared/global/ZenJS/index";
import $create from "../../Object/$create/index";
import equals from "../../shared/util/equals";
import congruence from "../../shared/util/congruence";
import isArray from "../../shared/global/Array/isArray";
import isBoolean from "../../shared/util/isBoolean";
import isFunction from "../../shared/util/isFunction";
import isNumber from "../../shared/util/isNumber";
import isObject from "../../shared/util/isObject";
import isRegExp from "../../shared/util/isRegexp";
import isString from "../../shared/util/isString";
import parametersDefault from "../../shared/util/parametersDefault";
import parametersRest from "../../shared/util/parametersRest";
import returnTrue from "../../shared/util/returnTrue";
import returnFalse from "../../shared/util/returnFalse";
import define from "../../shared/util/define";
import defineGet from "../../shared/util/defineGet";
import defineValue from "../../shared/util/defineValue";
import isReferenceType from "../../shared/util/isReferenceType";
import getDecimalLength from "../../shared/util/getDecimalLength";

ZenJS.util = $create( true, {

  isEquals: equals,
  isCongruence: congruence,

  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isReferenceType,

  parametersDefault,
  parametersRest,

  define,
  defineGet,
  defineValue,
  returnTrue,
  returnFalse,

  getDecimalLength
});