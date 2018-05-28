import Zen from "../../shared/global/Zen/index";
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

const util = Zen.util = $create( true );

util.is = $create( true, {
  equals,
  congruence
});

util.types = $create( true, {
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isRegExp,
  isString
});

util.parameters = $create( true, {
  default: parametersDefault,
  rest: parametersRest
});

util.fn = $create( true, {
  returnTrue,
  returnFalse
});