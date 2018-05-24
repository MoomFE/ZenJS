import Zen from "../../shared/global/Zen/index";
import $create from "../../Object/$create/index";
import equal from "../../shared/util/equal";
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

Zen.util = $create( true, {
  is: {
    equal,
    congruence
  },
  types: {
    isArray,
    isBoolean,
    isFunction,
    isNumber,
    isObject,
    isRegExp,
    isString
  },
  parameters: {
    default: parametersDefault,
    rest: parametersRest
  },
  fn: {
    returnTrue,
    returnFalse
  }
});