import root from "../../shared/const/root";
import _assign from "../../shared/util/assign";
import assign from "../../shared/global/Object/assign";
import entries from "../../shared/global/Object/entries";
import congruence from "../../shared/util/congruence";
import equals from "../../shared/util/equals";
import define from "../../shared/util/define";
import defineValue from "../../shared/util/defineValue";
import defineGet from "../../shared/util/defineGet";
import intRandom from "../../shared/util/intRandom";
import returnArg from "../../shared/util/returnArg";
import returnTrue from "../../shared/util/returnTrue";
import returnFalse from "../../shared/util/returnFalse";
import parametersDefault from "../../shared/util/parametersDefault";
import parametersRest from "../../shared/util/parametersRest";
import isString from "../../shared/util/isString";
import isBoolean from "../../shared/util/isBoolean";
import isArray from "../../shared/global/Array/isArray";
import isFunction from "../../shared/util/isFunction";
import { isNumber } from "../../shared/util/isNumber";
import isObject from "../../shared/util/isObject";
import isRegExp from "../../shared/util/isRegExp";
import isSet from "../../shared/util/isSet";
import isMap from "../../shared/util/isMap";
import mapSetToArray from "../../shared/util/mapSetToArray";
import isReferenceType from "../../shared/util/isReferenceType";


const ZenJS = root.ZenJS = _assign( false, [ null, {

    polyfill: {
      assign: assign,
      entries: entries
    },
  
    util: {

      congruence: congruence,
      equals: equals,

      define: define,
      defineValue: defineValue,
      defineGet: defineGet,

      intRandom: intRandom,

      returnArg: returnArg,
      returnTrue: returnTrue,
      returnFalse: returnFalse,

      parametersDefault: parametersDefault,
      parametersRest: parametersRest,

      isString: isString,
      isBoolean: isBoolean,
      isArray: isArray,
      isNumber: isNumber,
      isRegExp: isRegExp,
      isSet: isSet,
      isMap: isMap,
      isFunction: isFunction,
      isObject: isObject,
      isReferenceType: isReferenceType,

      mapSetToArray: mapSetToArray
    }

  }
]);

export default ZenJS;