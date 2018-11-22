import _assign from "../../util/assign";
import assign from "../Object/assign";
import entries from "../Object/entries";
import values from "../Object/values";
import repeat from "../../util/repeat";
import congruence from "../../util/congruence";
import equals from "../../util/equals";
import define from "../../util/define";
import defineValue from "../../util/defineValue";
import defineGet from "../../util/defineGet";
import intRandom from "../../util/intRandom";
import returnArg from "../../util/returnArg";
import returnTrue from "../../util/returnTrue";
import returnFalse from "../../util/returnFalse";
import noop from "../../util/noop";
import parametersDefault from "../../util/parametersDefault";
import parametersRest from "../../util/parametersRest";
import isString from "../../util/isString";
import isBoolean from "../../util/isBoolean";
import isArray from "../Array/isArray";
import isFunction from "../../util/isFunction";
import { isNumber } from "../../util/isNumber";
import isObject from "../../util/isObject";
import isRegExp from "../../util/isRegExp";
import isSet from "../../util/isSet";
import isMap from "../../util/isMap";
import mapSetToArray from "../../util/mapSetToArray";
import isReferenceType from "../../util/isReferenceType";
import root from "../../const/root";
import keys from "../Object/keys";


const ZenJS =  root.ZenJS = _assign( false, [ null, {// fromEntries

    assign: assign,
    repeat: repeat,
    keys: keys,
    entries: entries,
    values: values,

    congruence: congruence,
    equals: equals,

    define: define,
    defineValue: defineValue,
    defineGet: defineGet,

    intRandom: intRandom,

    returnArg: returnArg,
    returnTrue: returnTrue,
    returnFalse: returnFalse,
    noop: noop,

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

    mapSetToArray: mapSetToArray,

    config: {
      event: {
        modifiers: true,
        returnFalse: true
      }
    }

  }
]);

export default ZenJS;