/*!
 * Zen.js v3.1.0
 * https://github.com/MoomFE/ZenJS
 * 
 * (c) 2018 Wei Zhang
 * Released under the MIT License.
 */

var defineProperty = Object.defineProperty;

var StringProto = String.prototype;

var BooleanProto = Boolean.prototype;

var ArrayProto = Array.prototype;

var FunctionProto = Function.prototype;

[['String', StringProto], ['Boolean', BooleanProto], ['Array', ArrayProto], ['Function', FunctionProto]].forEach(function (obj) {
  defineProperty(obj[1], "__is".concat(obj[0], "__"), {
    value: true,
    configurable: false,
    // 删除/定义
    enumerable: false,
    // 枚举
    writable: false // 写入

  });
});
var isString = '__isString__';
var isBoolean = '__isBoolean__';
var isArray = '__isArray__';
var isFunction = '__isFunction__';

var keys = Object.keys;

/**
 * 方法返回一个给定对象自身可枚举属性的键值对数组.
 * Object.entries polyfill
 */

var entries = Object.entries || function (obj) {
  var index, key;
  var ownKeys = keys(obj);
  var result = Array(index = ownKeys.length);

  while (index--) {
    result[index] = [key = ownKeys[index], obj[key]];
  }

  return result;
};

var ObjectProto = Object.prototype;

var toString = ObjectProto.toString;

var getPrototypeOf = Object.getPrototypeOf;

var hasOwnProperty = Object.hasOwnProperty;

/**
 * 判断传入对象是否是 Function 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
function isFunction$1(obj) {
  return typeof obj === 'function';
}

/**
 * Transplant from jQuery
 * Version: 3.3.1
 * Homepage: https://jquery.com
 */

var fnToString = hasOwnProperty.toString,
    ObjectFunctionString = fnToString.call(Object);
function isPlainObject(obj) {
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false;
  }

  var proto = getPrototypeOf(obj);

  if (!proto) {
    return true;
  }

  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return isFunction$1(Ctor) && fnToString.call(Ctor) === ObjectFunctionString;
}

var create = Object.create;

/**
 * 将多个源对象的可枚举属性合并到第一个对象中
 * @param {Boolean} shallow 是否使用浅拷贝模式, 类似于使用 Object.assign
 */

function assign(shallow, args, parent, noProto) {
  var length = args.length;
  /** 首个源对象下标 */

  var index = 1;
  /** 目标对象 */

  var target = args[0] || (args[0] !== null ? {} : (noProto = true, create(null)));
  /** 当前源对象 */

  var options;
  /** 当前源对象所有可枚举属性名及属性 */

  var ownEntries;
  var ownLength, ownIndex, ownEntrie, ownEntrieName;
  var ownValue, targetValue, cloneValue; // 遍历参数

  for (; index < length; index++) {
    // 无用参数
    if ((options = args[index]) == null) continue; // 所有可枚举属性
    // [ [ key, value ], [ key, value ], [ key, value ] ]

    ownEntries = entries(options);
    ownLength = ownEntries.length;
    ownIndex = 0;

    for (; ownIndex < ownLength; ownIndex++) {
      // [ key, value ]
      ownEntrie = ownEntries[ownIndex];
      ownEntrieName = ownEntrie[0];
      ownValue = ownEntrie[1]; // 非浅拷贝模式下, 当前值是原生对象或数组, 则进行深拷贝

      if (!shallow && ownValue && (isPlainObject(ownValue) || ownValue[isArray])) {
        // 防御下面这种无限引用
        // var target = {};
        // var source = { infiniteLoop: target };
        // 
        // Object.$assign( target, source );
        if (ownValue === target) continue; // 防御下面这种无限引用
        // var target = {};
        // var source = {};
        // target.source = source;
        // source.target = target;
        // 
        // Object.$assign( {}, target )
        else if (parent && parent === ownValue) {
            if (ownLength === 1) return undefined;
            continue;
          }
        targetValue = target[ownEntrieName];

        if (ownValue[isArray]) {
          cloneValue = targetValue && targetValue[isArray] ? targetValue : [];
        } else {
          cloneValue = targetValue && isPlainObject(targetValue) ? targetValue : noProto ? create(null) : {};
        }

        if (assign(false, [cloneValue, ownValue], options, noProto) !== undefined) {
          target[ownEntrieName] = cloneValue;
        }
      } else if (ownValue !== undefined || hasOwnProperty.call(target, ownEntrieName) === false) {
        target[ownEntrieName] = ownValue;
      }
    }
  }

  return target;
}

/**
 * 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象. 它将返回目标对象.
 * Object.assign polyfill
 */

var assign$1 = Object.assign || function () {
  return assign(true, arguments);
};

var isArray$1 = Array.isArray;

/**
 * 在一个对象上定义/修改一个新属性 ( 对 Object.defineProperty 的封装 )
 * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
 * @param {String} name 要定义或修改的属性的名称
 * @param {any} options 将被定义或修改的属性描述符
 * @param {any} options2 将被定义或修改的属性描述符, 会覆盖前一个 options
 */

function define(obj, name, options, options2) {
  if (obj == null) {
    return;
  } // define( [ window, document ], name, options )


  if (isArray$1(obj) && obj instanceof Array) {
    obj.forEach(function (obj) {
      return define(obj, name, options, options2);
    });
    return;
  }

  name.split(' ').forEach(function (name) {
    defineProperty(obj, name, assign$1({}, options, options2));
  });
}

var definePropertyOptions = {
  configurable: true,
  // 删除/定义
  enumerable: false,
  // 枚举
  writable: true // 写入

};
var defineGetPropertyOptions = {
  configurable: true,
  // 删除/定义
  enumerable: false // 枚举

};

/**
 * 在一个对象上定义/修改一个新属性的 value 描述符
 * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
 * @param {String} name 要定义或修改的属性的名称
 * @param {Function} value 将被定义或修改的 value 描述符
 * @param {any} options 将被定义或修改的属性描述符
 */

function defineValue(obj, name, value, options) {
  define(obj, name, {
    value: value
  }, options || definePropertyOptions);
  return value;
}

/**
 * 判断传入对象是否是 String 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
function isString$1(obj) {
  return typeof obj === 'string';
}

/**
 * 判断传入对象是否是 Number 类型, 并且不为 NaN 和 Infinity
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */

function isNumber(obj) {
  return typeof obj === 'number' && obj === obj && isFinite(obj);
}
/**
 * 判断传入的对象是否是数字
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */

function $isNumber(obj) {
  if (isNumber(obj)) return true;
  return isString$1(obj) && !isNaN(obj - parseFloat(obj));
}

/**
 * 快捷创建数组
 * @param length 需要创建的数组的长度
 * @param insert 需要填充到数组中的内容, 若传入方法, 将会向方法内传入当前 index, 然后将方法的返回值填充到数组中
 * @param isInsert 若值为真, 即使二个参数 insert 是方法, 都会直接进行插入
 */

function create$1(length, insert, isInsert) {
  if (!isNumber(length) || length < 1) {
    return [];
  }

  var i = 0;
  var result = Array(length);

  if (!isInsert && isFunction$1(insert)) {
    for (; i < length; i++) {
      result[i] = insert(i);
    }
  } else {
    for (; i < length; i++) {
      result[i] = insert;
    }
  }

  return result;
}

var ceil = Math.ceil;

/**
 * 创建一个新的数组, 将传入数组按照指定的长度进行分割, 如果数组不能均分, 则最后的数组中是数组剩余的元素
 * @param array 需要进行分割的数组
 * @param size 分割的长度
 */

function chunk(array, size) {
  var length;

  if (!array || size < 1 || !(length = array.length)) {
    return [];
  }

  return create$1(ceil(length / size), function (index) {
    var start = index * size;
    return array.slice(start, start + size);
  });
}

defineValue(Array, '$chunk', chunk);
defineValue(ArrayProto, '$chunk', function (size) {
  return chunk(this, size);
});

var slice = ArrayProto.slice;

defineValue(Array, '$copy', function (source, array) {
  if (!source || !source.length) {
    return [];
  }

  if (isArray$1(array)) {
    return array.concat(source);
  }

  return slice.call(source);
});

defineValue(Array, '$create', create$1);

function $each(array, callback) {
  if (!array || !array.length || !isFunction$1(callback)) {
    return array;
  }

  var length = array.length;
  var index = 0,
      value;

  for (; index < length; index++) {
    value = array[index];

    if (callback.call(value, value, index, array) === false) {
      break;
    }
  }

  return array;
}
defineValue(Array, '$each', $each);
defineValue(ArrayProto, '$each', function (callback) {
  return $each(this, callback);
});

var MAX_SAFE_INTEGER = 9007199254740991;
function isArrayLike(obj) {
  if (obj == null || obj[isFunction]) {
    return false;
  }

  if (obj[isArray]) {
    return true;
  }

  var length = obj.length;

  if (isNumber(length) && length > -1 && length % 1 === 0 && length <= MAX_SAFE_INTEGER) {
    return true;
  }

  return false;
}

/**
 * 获取方法指定位参数, 若未传入参数, 则取默认值
 * @param {IArguments} args arguments
 * @param {Number} index 需要在 argument 中取得默认值的下标
 * @param {any} defaultValue 若未传入值时取得默认值
 * @returns {any}
 */
function parametersDefault(args, index, defaultValue) {
  var arg;

  if (args.length > index && (arg = args[index]) !== undefined) {
    return arg;
  }

  return defaultValue;
}

/**
 * 判断传入的两个参数是否相等 ( == )
 * @param {any} one 需要判断的第一参数
 * @param {any} two 需要判断的第二参数
 * @returns {Boolean}
 */
function equals(one, two) {
  return one == two;
}

/**
 * 判断传入的两个参数是否全等 ( === )
 * @param {any} one 需要判断的第一参数
 * @param {any} two 需要判断的第二参数
 * @returns {Boolean}
 */
function congruence(one, two) {
  return one === two;
}

/**
 * 返回一个可以判断两个值的方法.
 * 如果传入值为 Function 类型, 说明是用户传的方法, 则直接返回;
 * 如果传入值不为 Function 类型, 则值是真值, 则返回全等判断方法, 否则返回双等判断方法
 * 
 * @param {*} predicate 
 */

function getPredicate(predicate) {
  if (isFunction$1(predicate)) {
    return predicate;
  }

  return predicate ? congruence : equals;
}
function autoGetPredicate(args, value, predicateIndex, predicate) {
  if (args.length > 1) {
    predicate = getPredicate(parametersDefault(args, predicateIndex, true));
  } else if (isFunction$1(value)) {
    predicate = value;
    value = undefined;
  } else {
    predicate = congruence;
  }

  return [value, predicate];
}

function equals$1(array, array2) {
  // 可比较数组及类数组的内容
  if (!(isArrayLike(array) && isArrayLike(array2))) {
    return false;
  }

  var length = array.length;

  if (length !== array2.length) {
    return false;
  }

  var predicate = getPredicate(parametersDefault(arguments, 2, true));

  for (var index = 0; index < length; index++) {
    if (!predicate(array[index], array2[index])) {
      return false;
    }
  }

  return true;
}
defineValue(Array, '$equals', equals$1);
defineValue(ArrayProto, '$equals', function (obj, predicate) {
  return equals$1(this, obj, predicate);
});

defineValue(Array, '$isArrayLike', isArrayLike);

var reHasUnicode = /[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/;

var reUnicode = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g;

/**
 * 判断传入对象是否是 Map 对象
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */

function isMap(obj) {
  return isFunction$1(Map) && obj instanceof Map;
}

/**
 * 判断传入对象是否是 Set 对象
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */

function isSet(obj) {
  return isFunction$1(Set) && obj instanceof Set;
}

/**
 * 将 Map 或 Set 类型转换为数组类型,
 * 执行到这之前必须确定传进来的是 Map 或 Set 类型
 * @param { Map | Set } map 
 */
function mapSetToArray(map) {
  var result = [];

  if (map instanceof Map) {
    map.forEach(function (key, value) {
      return result.push([value, key]);
    });
  } else {
    map.forEach(function (value) {
      return result.push(value);
    });
  }

  return result;
}

function $toArray(value) {
  // 不可转为数组的, 直接返回空数组
  if (!value || value[isBoolean]) {
    return [];
  } // 是字符串类型


  if (value[isString]) {
    if (reHasUnicode.test(value)) {
      return value.match(reUnicode) || [];
    } else {
      return value.split('');
    }
  } // 是数组类型, 那就直接返回一个副本


  if (isArrayLike(value)) {
    return slice.call(value);
  } // 转换 Map, Set 类型


  if (isMap(value) || isSet(value)) {
    return mapSetToArray(value);
  }

  return [];
}
defineValue(Array, '$toArray', $toArray);

/**
 * 获取方法从指定位开始的剩余参数
 * @param { IArguments } args arguments
 * @param { Number } index 需要在 arguments 中开始取参数的下标 - default: 0
 * @returns {any[]}
 */

function parametersRest(args) {
  var index = parametersDefault(arguments, 1, 0);
  var length = args.length;

  if (length > index) {
    return slice.call(args, index, length);
  }

  return [];
}

/**
 * 将一个传入的数组的下标修复到正确的位置上,
 * 下标不是数字则返回 0,
 * 下标为负数, 则计算出在数组中应有的下标,
 * 下标为负数且计算完后的下标依旧小于 0, 则返回 0
 * 
 * @param {Array} array 原数组
 * @param {Number} index 传入的下标, 可为负数
 * @param {Number} add 额外值
 * @returns {Number}
 */

function fixArrayIndex(array, index, add) {
  if (!$isNumber(index) || index < 0 && (index = array.length + Number(index) + (add || 0)) < 0) {
    index = 0;
  }

  return index;
}

function $add(self, index, args) {
  var length = args.length;

  if (!length) {
    return self;
  }

  index = fixArrayIndex(self, index, 1);

  for (var i = 0; i < length; i++) {
    self.splice(index++, 0, args[i]);
  }

  return self;
}
defineValue(ArrayProto, '$add', function (index) {
  return $add(this, index, parametersRest(arguments, 1));
});

defineValue(ArrayProto, '$delete $remove', function (index, noop, returnDeleted) {
  var length = this.length;

  if ((index = fixArrayIndex(this, index)) >= length) {
    index = length - 1;
  }

  var num = parametersDefault(arguments, 1, 1);
  var deleted = this.splice(index, num);
  return returnDeleted ? deleted : this;
});

defineValue(ArrayProto, '$deleteValue $removeValue', function (_value) {
  var length = this.length,
      index;

  if (!length) {
    return this;
  }

  var args = autoGetPredicate(arguments, _value, 1);
  var value = args[0];
  var predicate = args[1];

  for (index = 0; index < length;) {
    if (predicate(this[index], value)) {
      this.$delete(index);
      length--;
    } else {
      index++;
    }
  }

  return this;
});

defineValue(ArrayProto, '$concat', function () {
  var _this = this;

  slice.call(arguments).forEach(function (arg) {
    $add(_this, -1, isArray$1(arg) ? arg : [arg]);
  });
  return this;
});
defineValue(ArrayProto, '$concatTo', function (index) {
  var _this2 = this;

  var args = parametersRest(arguments, 1);

  if (!args.length) {
    return this;
  }

  var originLength = this.length;
  var increasedLength = 0;
  index = fixArrayIndex(this, index, 1);
  args.forEach(function (arg) {
    $add(_this2, increasedLength + index, isArray$1(arg) ? arg : [arg]); // 用于修正 index, 后续的 arg 需要插入到前面的 arg 后面

    increasedLength = _this2.length - originLength;
  });
  return this;
});

/**
 * @param {Array} self 进行遍历的数组
 * @param {Number} count 保存的查找结果数量
 * @param {Boolean} reverse 是否反向查询
 * @param {IArguments} args 来源方法的 arguments
 */

function findIndex(self, count, reverse, args, predicate, obj, fromIndex) {
  var length; // 传入的内容不可检索或者数组为空

  if (predicate == null || !(length = self.length)) {
    return -1;
  }
  /** 遍历 */


  var traversal;
  /** 首个参数是否是方法类型 */

  var predicateIsFunction = predicate[isFunction]; // 首个参数是方法或布尔值

  if (predicateIsFunction || predicate[isBoolean]) {
    // $findIndex( Function, fromIndex )
    // 传入的方法是用作数组遍历时的手动进行检测
    if (predicateIsFunction && (args.length === 1 || isNumber(obj))) {
      traversal = predicate;
      fromIndex = obj || (reverse ? -1 : 0);
    } // $findIndex( Function | Boolean, key, value, fromIndex )
    // $findIndex( Function | Boolean, Array, fromIndex )
    // $findIndex( Function | Boolean, Object, fromIndex )
    // 传入的方法是用作值比对时进行检测
    else {
        // 正常参数校正 index 为从 1 的地方开始
        args = parametersRest(args, 1); // 指定值比对时的方法

        if (!predicateIsFunction) {
          predicate = predicate ? congruence : equals;
        }
      }
  } // $findIndex( key, value, fromIndex )
  // $findIndex( Array, fromIndex )
  // $findIndex( Object, fromIndex )
  else {
      // 首个参数不是对比的方法, 那么校正 obj 和 fromIndex 的位置
      obj = args[0];
      fromIndex = args[1]; // 默认使用全等的比较方法

      predicate = congruence;
    } // 指定值遍历时的检测方法


  if (!traversal) {
    // 第一个参数不是数组或对象, 视为传入 key, value 进行匹配
    if (typeof obj !== 'object') {
      obj = fromIndex === undefined ? [obj] : [obj, fromIndex];
      fromIndex = args[2];
    } // 将类数组类型的按照键值对进行分割
    // $findIndex( [ 'key', 'value', 'key2', 'value2' ] ) -> [ [ 'key', 'value' ], [ 'key2', 'value2' ] ]


    if (isArrayLike(obj)) {
      obj = chunk(obj, 2);
    }

    traversal = getTraversal(obj, predicate);
  }
  /** 初始开始遍历的 index */


  var index = isNumber(fromIndex) ? fixArrayIndex(self, fromIndex) : reverse ? length - 1 : 0;
  /** 值, 缓存 */

  var value;
  /** 每次自增的值 */

  var add = reverse ? -1 : 1;
  /** 返回值 */

  var result = []; // 遍历数组内的对象, 交给检测方法进行检测

  for (; index >= 0 && index <= length - 1; index += add) {
    if (traversal(value = self[index]) && result.$push([index, value]).length >= count) {
      return result;
    }
  }

  return result;
}

function getTraversal(obj, predicate) {
  var objIsArray = obj[isArray];
  return function (object) {
    if (object == null || !keys(object).length) {
      return false;
    }

    return (objIsArray ? checkArray : checkObject)(obj, object, predicate);
  };
}

function checkArray(source, object, predicate) {
  var length = source.length;
  var index = 0,
      chunk$$1,
      key; // 遍历检测对象

  for (; index < length; index++) {
    chunk$$1 = source[index];
    key = chunk$$1[0];

    if (!(key in object && (chunk$$1.length === 1 || predicate(chunk$$1[1], object[key])))) {
      return false;
    }
  }

  return true;
}

function checkObject(source, object, predicate) {
  var sKeys = keys(source),
      sLength = sKeys.length;
  var index = 0,
      key; // 遍历检测对象

  for (; index < sLength; index++) {
    key = sKeys[index];

    if (!(key in object && predicate(source[key], object[key]))) {
      return false;
    }
  }

  return true;
}

defineValue(ArrayProto, '$find', function (predicate, obj, fromIndex) {
  var result = findIndex(this, 1, false, arguments, predicate, obj, fromIndex);
  return (result[0] || [])[1];
});
defineValue(ArrayProto, '$findIndex', function (predicate, obj, fromIndex) {
  var result = findIndex(this, 1, false, arguments, predicate, obj, fromIndex);
  return result.length ? result[0][0] : -1;
});
defineValue(ArrayProto, '$findLast', function (predicate, obj, fromIndex) {
  var result = findIndex(this, 1, true, arguments, predicate, obj, fromIndex);
  return (result[0] || [])[1];
});
defineValue(ArrayProto, '$findLastIndex', function (predicate, obj, fromIndex) {
  var result = findIndex(this, 1, true, arguments, predicate, obj, fromIndex);
  return result.length ? result[0][0] : -1;
});
defineValue(ArrayProto, '$findAll', function (predicate, obj, fromIndex) {
  return findIndex(this, Infinity, false, arguments, predicate, obj, fromIndex).map(function (arr) {
    return arr[1];
  });
});

defineValue(ArrayProto, '$get', function () {
  var args = arguments;
  var index = fixArrayIndex(this, parametersDefault(args, 0, 0));

  if (args.length <= 1) {
    return this[index];
  }

  var num = parametersDefault(args, 1, 1);
  return this.slice(index, num + index);
});

/**
 * 判断传入对象是否是 Object 类型, 并且不为 null
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

defineValue(ArrayProto, '$set $edit', function (index, value) {
  var _this = this;

  if (isObject(index)) {
    entries(index).forEach(function (arr) {
      return set(_this, arr[0], arr[1]);
    });
  } else {
    set(this, index, value);
  }

  return this;
});

function set(array, index, value) {
  var length = array.length;

  if ((index = fixArrayIndex(array, index)) >= length) {
    index = length - 1;
  }

  array.splice(index, 1, value);
}

defineValue(ArrayProto, '$inArray', function (_value) {
  var index,
      length = this.length;

  if (!length) {
    return false;
  }

  var args = autoGetPredicate(arguments, _value, 1);
  var value = args[0];
  var predicate = args[1];

  for (index = 0; index < length; index++) {
    if (predicate(this[index], value)) {
      return true;
    }
  }

  return false;
});

defineValue(ArrayProto, '$move', function (from, to) {
  this.splice(fixArrayIndex(this, to), 0, this.splice(from, 1)[0]);
  return this;
});

defineValue(ArrayProto, '$moveRange', function (start, moveCount, toIndex) {
  return $add(this, fixArrayIndex(this, toIndex), this.splice(start, moveCount));
});

['push', 'pop', 'unshift', 'shift', 'splice'].forEach(function (key) {
  defineValue(ArrayProto, '$' + key, function () {
    this[key].apply(this, arguments);
    return this;
  });
});

/**
 * 判断传入对象是否是 Boolean 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
function isBoolean$1(obj) {
  return typeof obj === 'boolean';
}

defineValue(Object, '$assign', function (shallow) {
  if (isBoolean$1(shallow)) {
    return assign(shallow, parametersRest(arguments, 1));
  }

  return assign(false, arguments);
});
defineValue(ObjectProto, '$assign', function (shallow) {
  if (isBoolean$1(shallow)) {
    return assign(shallow, [this].concat(parametersRest(arguments, 1)));
  }

  return assign(false, [this].concat(slice.call(arguments)));
});

/**
 * @type {Boolean} 当前是否是浏览器环境
 */
var inBrowser = typeof window !== 'undefined';

/**
 * @type {Element}
 */

var DomElement = inBrowser ? window.Element : undefined;

var rType = /^\[object\s([^\]]+)]$/;

/**
 * 判断一个对象是否是引用类型
 * @param {any} obj 需要判断的对象
 */
function isReferenceType(obj) {
  var type = typeof obj;
  return type === 'object' || type === 'function';
}

function equals$2(obj, obj2, parent, parent2) {
  if (obj === obj2) {
    return true;
  } // 其中一个是假值 ( undefined, null, false, '', 0, NaN )


  if (!obj || !obj2) {
    // 对付 NaN 用的, 要不然直接就返回 false 了
    return obj !== obj && obj2 !== obj2;
  }

  var oString = toString.call(obj); // 实际类型不一样 ( RegExp, Element, ... )
  // 比如上面两种类型都是 object, 但是实际上却是不一样的
  // 过了这一步骤, 类型比对时就只需要比对一个值, 因为类型是完全相同的

  if (oString !== toString.call(obj2)) {
    return false;
  } // 非引用类型 ( String, Boolean, Number )


  if (!isReferenceType(obj)) {
    return false;
  } // 对于 object 更加细致点的比对 ( Map, Set, ... )
  // 它们两都是 [object Object]


  if (obj.constructor !== obj2.constructor) {
    return false;
  } // 是数组类型或类数组类型 ( Array, LikeArray )


  if (isArrayLike(obj)) {
    return types.array(obj, obj2, parent, parent2);
  } // 原始对象类型 ( JSON )


  if (isPlainObject(obj)) {
    return types.object(obj, obj2, parent, parent2);
  }

  var oType = oString.match(rType)[1].toLowerCase(); // 有针对性的比对方法 ( Regexp, Date, Function )

  if (oType in types) {
    return types[oType](obj, obj2, parent, parent2);
  } // ( Elemnet )


  if (DomElement && obj instanceof DomElement) {
    return types.element(obj, obj2);
  } // ( Map, Set )


  if (isMap(obj) || isSet(obj)) {
    return equals$2(mapSetToArray(obj), mapSetToArray(obj2));
  }

  return types.object(obj, obj2, parent, parent2);
}
var types = {
  /**
   * @param {Array} obj 
   * @param {Array} obj2 
   */
  array: function (obj, obj2, parent, parent2) {
    var length = obj.length,
        i;

    if (length !== obj2.length) {
      return false;
    }

    for (i = 0; i < length; i++) {
      switch (checkInfiniteLoop(obj[i], obj2[i], parent, parent2, obj, obj2)) {
        case 0:
          return false;

        case 1:
          continue;
      }
    }

    return true;
  },

  /**
   * @param {Object} obj 
   * @param {Object} obj2 
   */
  object: function (obj, obj2, parent, parent2) {
    var _keys = keys(obj);

    var length = _keys.length;
    var i, key;

    if (length !== keys(obj2).length) {
      return false;
    }

    for (i = 0; i < length; i++) {
      key = _keys[i];

      switch (checkInfiniteLoop(obj[key], obj2[key], parent, parent2, obj, obj2)) {
        case 0:
          return false;

        case 1:
          continue;
      }
    }

    return true;
  },

  /**
   * @param {Element} obj 
   * @param {Element} obj2 
   */
  element: function (obj, obj2) {
    return obj.outerHTML === obj2.outerHTML;
  },

  /**
   * @param {RegExp} obj 
   * @param {RegExp} obj2 
   */
  regexp: function (obj, obj2) {
    return obj.toString() === obj2.toString();
  },

  /**
   * @param {Date} obj 
   * @param {Date} obj2 
   */
  date: function (obj, obj2) {
    return +obj === +obj2;
  },

  /**
   * @param {Function} obj 
   * @param {Function} obj2 
   */
  function: function (obj, obj2) {
    return obj.toString() === obj2.toString();
  }
};
/**
 * 检查是否无限引用, 然后继续进行下一步判断
 * @returns {Number} 0: 执行 return;
 *                   1: 执行 continue;
 */

function checkInfiniteLoop(value, value2, parent, parent2, obj, obj2) {
  // 避免无限引用
  if (parent && (parent === value || parent2 === value2)) {
    return parent === value ? parent2 === value2 ? 1 : 0 : parent === value ? 1 : 0;
  } // 进行下一步判断


  if (!equals$2(value, value2, obj, obj2)) {
    return 0;
  }
}

defineValue(Object, '$equals', function (obj, obj2) {
  return equals$2(obj, obj2);
});
defineValue(ObjectProto, '$equals', function (obj2) {
  return equals$2(this, obj2);
});

function each(obj, callback) {
  if (obj == null) {
    return obj;
  }

  var oKeys = keys(obj),
      length = oKeys.length;
  var index = 0,
      key,
      value;

  for (; index < length; index++) {
    key = oKeys[index];
    value = obj[key];

    if (callback.call(value, key, value, obj) === false) {
      break;
    }
  }

  return obj;
}
defineValue(Object, '$each', each);
defineValue(ObjectProto, '$each', function (callback) {
  return each(this, callback);
});

/**
 * 判断传入对象是否是空对象
 * @param {*} obj 需要判断的对象
 */
function isEmptyObject(obj) {
  for (var a in obj) {
    return false;
  }

  return true;
}

defineValue(Object, '$isEmptyObject', isEmptyObject);

defineValue(Object, '$isPlainObject', isPlainObject);

// import './$delete/index';
// import './$deleteValue/index';
// import './$each/index';
// import './$get/index';
// import './$isEmptyObject/index';
// import './$isPlainObject/index';
// import './$self/index';
// import './$set/index';

defineValue(ObjectProto, '$get', function (key) {
  var _this = this;

  if (arguments.length < 2) {
    return this[key];
  }

  var result = {};
  slice.call(arguments).forEach(function (key) {
    result[key] = _this[key];
  });
  return result;
});

defineValue(ObjectProto, '$set $edit', function (key, value) {
  var _this = this;

  if (isObject(key)) {
    each(key, function (key, value) {
      _this[key] = value;
    });
    return this;
  }

  this[key] = value;
  return this;
});

var concat = ArrayProto.concat;

defineValue(ObjectProto, '$delete $remove', function () {
  var _this = this;

  concat.apply([], arguments).forEach(function (key) {
    delete _this[key];
  });
  return this;
});

defineValue(ObjectProto, '$deleteValue $removeValue', function (_value) {
  var _this = this;

  var args = autoGetPredicate(arguments, _value, 1);
  var value = args[0];
  var predicate = args[1];
  entries(this).forEach(function (obj) {
    if (predicate(obj[1], value)) {
      delete _this[obj[0]];
    }
  });
  return this;
});

function self() {
  return this;
}

defineValue(ObjectProto, '$self', self);

defineValue(Number, '$isNumber', $isNumber);

var floor = Math.floor;

var random = Math.random;

/**
 * 在传入的两个正整数中随机一个数字
 * @param {Number} from 
 * @param {Number} to 
 */

function intRandom(from, to) {
  return floor(random() * (to - from + 1) + from);
}

var abs = Math.abs;

defineValue(Math, '$random', function () {
  var args = arguments;
  var from = parametersDefault(args, 0, 0);
  var to = args.length !== 1 ? parametersDefault(args, 1, 9) : 0;

  if (from > to) {
    var _ref = [to, from];
    from = _ref[0];
    to = _ref[1];
  }

  if (from > 0) {
    return intRandom(from, to);
  }

  var result = intRandom(0, to + abs(from));
  return result > to ? to - result : result;
});

/**
 * 获取传入数字的小数位长度
 * @param {Number} num
 * @returns {Number}
 */
function getDecimalLength(num) {
  return (('' + num).split('.')[1] || '').length;
}

var max = Math.max;

var pow = Math.pow;

/**
 * 构造并返回一个新字符串, 该字符串包含被连接在一起的指定数量的字符串的副本.
 * String.prototype.repeat polyfill
 * @param {String} str 需要重复的字符串
 * @param {Number} count 需要重复的次数
 */
function repeat(str, count) {
  var result = '';

  while (count--) {
    result += str;
  }

  return result;
}

var NumberProto = Number.prototype;

function defineOperation(name, handlerFn) {
  defineValue(Math, name, handlerFn);
  defineValue(NumberProto, name, function (num) {
    return handlerFn(this, num);
  });
}
/**
 * 
 * @param {Number} num1 
 * @param {Number} num2 
 * @param {Function} handlerFn 
 * @param {Function} lastHandlerFn 
 */


function handler(num1, num2, handlerFn, lastHandlerFn) {
  var decimal1 = getDecimalLength(num1 = num1 || 0);
  var decimal2 = getDecimalLength(num2 = num2 || 0);
  var maxDecimal = max(decimal1, decimal2);
  var exponent = maxDecimal ? pow(10, maxDecimal) : 1;

  if (maxDecimal) {
    num1 = integer(num1, decimal1, maxDecimal);
    num2 = integer(num2, decimal2, maxDecimal);
  }

  var result = handlerFn(num1, num2);

  if (lastHandlerFn) {
    return lastHandlerFn(result, exponent);
  }

  return result / exponent;
}
/**
 * 将传入数字乘以一定的倍数, 不使用乘法的方式, 防止出现乘法精度不准的问题
 * @param {Number} num 需要处理的数字
 * @param {Number} decimal 当前数字的小数位
 * @param {Number} maxDecimal 最大小数位
 */


function integer(num, decimal, maxDecimal) {
  num = ('' + num).replace('.', '');

  if (decimal !== maxDecimal) {
    num += repeat('0', maxDecimal - decimal);
  }

  return Number(num);
} // add


defineOperation('$jia $add', $add$1);
function $add$1(num1, num2) {
  return handler(num1, num2, function (num1, num2) {
    return num1 + num2;
  });
} // subtract

defineOperation('$jian $subtract', function (num1, num2) {
  return handler(num1, num2, function (num1, num2) {
    return num1 - num2;
  });
}); // multiply

defineOperation('$cheng $multiply', function (num1, num2) {
  return handler(num1, num2, function (num1, num2) {
    return num1 * num2;
  }, function (result, exponent) {
    return result / pow(exponent, 2);
  });
}); // divide

defineOperation('$chu $divide', $divide);
function $divide(num1, num2) {
  return handler(num1, num2, function (num1, num2) {
    return num1 / num2;
  }, function (result) {
    return result;
  });
}

defineValue(Math, '$mean', function () {
  var count = slice.call(arguments).reduce(function (count, next) {
    return $add$1(count, next);
  });
  return $divide(count, arguments.length);
});

var fromCharCode = String.fromCharCode;

function stringRandom()
/* uppercase */
{
  var uppercase = parametersDefault(arguments, 0, false);
  return fromCharCode(uppercase ? intRandom(65, 90) : intRandom(97, 122));
}
defineValue(String, '$random', stringRandom);

defineValue(String, '$someRandom', function ()
/* length, uppercase, number */
{
  var args = arguments;
  var uppercase = parametersDefault(args, 1, false);
  var number = parametersDefault(args, 2, false);
  var result = '';
  var length = parametersDefault(args, 0, 12);

  while (length-- > 0) {
    // 指定了也随机大写字母, 则几率是三分之一
    // 否则只是随机小写字母及数字, 则几率是二分之一
    if (number && intRandom(0, uppercase ? 2 : 1) === 0) {
      result += intRandom(0, 9);
    } // 随机大小写字母
    else {
        result += stringRandom(uppercase && intRandom(0, 1) === 0);
      }
  }

  return result;
});

var rkeyword = /([\.\*\+\?\|\(\)\[\]\{\}\^\$])/g;

/**
 * 判断传入对象是否是 RegExp 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */

function isRegExp(obj) {
  return toString.call(obj) === '[object RegExp]';
}

defineValue(StringProto, '$replaceAll', function (searchValue, replaceValue) {
  var flags = 'g';

  if (searchValue == null) {
    return this;
  }

  if (searchValue[isString]) {
    searchValue = searchValue.replace(rkeyword, '\\$1');
  } else if (isRegExp(searchValue)) {
    if (searchValue.global) flags = searchValue.flags || '';else flags += searchValue.flags || '';
    searchValue = searchValue.source;
  }

  return this.replace(new RegExp(searchValue, flags), replaceValue || '');
});

defineValue(StringProto, '$toCapitalize', function (ignoreNext) {
  return this.substr(0, 1).toUpperCase() + this.substr(1)[ignoreNext ? '$self' : 'toLowerCase']();
});

var SECONDS_A_MINUTE = 60;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
var MILLISECONDS_A_SECOND = 1e3;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND; // English locales

var MS = 'millisecond';
var S = 'second';
var MIN = 'minute';
var H = 'hour';
var D = 'day';
var W = 'week';
var M = 'month';
var Q = 'quarter';
var Y = 'year';
var DATE = 'date';
var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ'; // regex

var REGEX_PARSE = /^(\d{4})-?(\d{1,2})-?(\d{0,2})(.*?(\d{1,2}):(\d{1,2}):(\d{1,2}))?.?(\d{1,3})?$/;
var REGEX_FORMAT = /\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
var en = {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
};

var padStart = function padStart(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length) return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};

var padZoneStr = function padZoneStr(negMinuts) {
  var minutes = Math.abs(negMinuts);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return "" + (negMinuts <= 0 ? '+' : '-') + padStart(hourOffset, 2, '0') + ":" + padStart(minuteOffset, 2, '0');
};

var monthDiff = function monthDiff(a, b) {
  // function from moment.js in order to keep the same result
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, 'months');
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), 'months');
  return Number(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)));
};

var absFloor = function absFloor(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
};

var prettyUnit = function prettyUnit(u) {
  var special = {
    M: M,
    y: Y,
    w: W,
    d: D,
    h: H,
    m: MIN,
    s: S,
    ms: MS
  };
  return special[u] || String(u || '').toLowerCase().replace(/s$/, '');
};

var isUndefined = function isUndefined(s) {
  return s === undefined;
};

var U = {
  padStart: padStart,
  padZoneStr: padZoneStr,
  monthDiff: monthDiff,
  absFloor: absFloor,
  prettyUnit: prettyUnit,
  isUndefined: isUndefined
};
var L = 'en'; // global locale

var Ls = {}; // global loaded locale

Ls[L] = en;

var isDayjs = function isDayjs(d) {
  return d instanceof Dayjs;
}; // eslint-disable-line no-use-before-define


var parseLocale = function parseLocale(preset, object, isLocal) {
  var l;
  if (!preset) return null;

  if (typeof preset === 'string') {
    if (Ls[preset]) {
      l = preset;
    }

    if (object) {
      Ls[preset] = object;
      l = preset;
    }
  } else {
    var name = preset.name;
    Ls[name] = preset;
    l = name;
  }

  if (!isLocal) L = l;
  return l;
};

var dayjs = function dayjs(date, c) {
  if (isDayjs(date)) {
    return date.clone();
  }

  var cfg = c || {};
  cfg.date = date;
  return new Dayjs(cfg); // eslint-disable-line no-use-before-define
};

var wrapper = function wrapper(date, instance) {
  return dayjs(date, {
    locale: instance.$L
  });
};

var Utils = U; // for plugin use

Utils.parseLocale = parseLocale;
Utils.isDayjs = isDayjs;
Utils.wrapper = wrapper;

var parseDate = function parseDate(date) {
  var reg;
  if (date === null) return new Date(NaN); // Treat null as an invalid date

  if (Utils.isUndefined(date)) return new Date();
  if (date instanceof Date) return date; // eslint-disable-next-line no-cond-assign

  if (typeof date === 'string' && /.*[^Z]$/i.test(date) // looking for a better way
  && (reg = date.match(REGEX_PARSE))) {
    // 2018-08-08 or 20180808
    return new Date(reg[1], reg[2] - 1, reg[3] || 1, reg[5] || 0, reg[6] || 0, reg[7] || 0, reg[8] || 0);
  }

  return new Date(date); // timestamp
};

var Dayjs =
/*#__PURE__*/
function () {
  function Dayjs(cfg) {
    this.parse(cfg); // for plugin
  }

  var _proto = Dayjs.prototype;

  _proto.parse = function parse(cfg) {
    this.$d = parseDate(cfg.date);
    this.init(cfg);
  };

  _proto.init = function init(cfg) {
    this.$y = this.$d.getFullYear();
    this.$M = this.$d.getMonth();
    this.$D = this.$d.getDate();
    this.$W = this.$d.getDay();
    this.$H = this.$d.getHours();
    this.$m = this.$d.getMinutes();
    this.$s = this.$d.getSeconds();
    this.$ms = this.$d.getMilliseconds();
    this.$L = this.$L || parseLocale(cfg.locale, null, true) || L;
  }; // eslint-disable-next-line class-methods-use-this


  _proto.$utils = function $utils() {
    return Utils;
  };

  _proto.isValid = function isValid() {
    return !(this.$d.toString() === 'Invalid Date');
  };

  _proto.$compare = function $compare(that) {
    return this.valueOf() - dayjs(that).valueOf();
  };

  _proto.isSame = function isSame(that) {
    return this.$compare(that) === 0;
  };

  _proto.isBefore = function isBefore(that) {
    return this.$compare(that) < 0;
  };

  _proto.isAfter = function isAfter(that) {
    return this.$compare(that) > 0;
  };

  _proto.year = function year() {
    return this.$y;
  };

  _proto.month = function month() {
    return this.$M;
  };

  _proto.day = function day() {
    return this.$W;
  };

  _proto.date = function date() {
    return this.$D;
  };

  _proto.hour = function hour() {
    return this.$H;
  };

  _proto.minute = function minute() {
    return this.$m;
  };

  _proto.second = function second() {
    return this.$s;
  };

  _proto.millisecond = function millisecond() {
    return this.$ms;
  };

  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1000);
  };

  _proto.valueOf = function valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime();
  };

  _proto.startOf = function startOf(units, _startOf) {
    var _this = this; // startOf -> endOf


    var isStartOf = !Utils.isUndefined(_startOf) ? _startOf : true;
    var unit = Utils.prettyUnit(units);

    var instanceFactory = function instanceFactory(d, m) {
      var ins = wrapper(new Date(_this.$y, m, d), _this);
      return isStartOf ? ins : ins.endOf(D);
    };

    var instanceFactorySet = function instanceFactorySet(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return wrapper(_this.toDate()[method].apply( // eslint-disable-line prefer-spread
      _this.toDate(), isStartOf ? argumentStart.slice(slice) : argumentEnd.slice(slice)), _this);
    };

    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);

      case M:
        return isStartOf ? instanceFactory(1, this.$M) : instanceFactory(0, this.$M + 1);

      case W:
        return isStartOf ? instanceFactory(this.$D - this.$W, this.$M) : instanceFactory(this.$D + (6 - this.$W), this.$M);

      case D:
      case DATE:
        return instanceFactorySet('setHours', 0);

      case H:
        return instanceFactorySet('setMinutes', 1);

      case MIN:
        return instanceFactorySet('setSeconds', 2);

      case S:
        return instanceFactorySet('setMilliseconds', 3);

      default:
        return this.clone();
    }
  };

  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };

  _proto.$set = function $set(units, int) {
    // private set
    var unit = Utils.prettyUnit(units);

    switch (unit) {
      case D:
        this.$d.setDate(this.$D + (int - this.$W));
        break;

      case DATE:
        this.$d.setDate(int);
        break;

      case M:
        this.$d.setMonth(int);
        break;

      case Y:
        this.$d.setFullYear(int);
        break;

      case H:
        this.$d.setHours(int);
        break;

      case MIN:
        this.$d.setMinutes(int);
        break;

      case S:
        this.$d.setSeconds(int);
        break;

      case MS:
        this.$d.setMilliseconds(int);
        break;

      default:
        break;
    }

    this.init();
    return this;
  };

  _proto.set = function set(string, int) {
    return this.clone().$set(string, int);
  };

  _proto.add = function add(number, units) {
    var _this2 = this;

    number = Number(number); // eslint-disable-line no-param-reassign

    var unit = Utils.prettyUnit(units);

    var instanceFactory = function instanceFactory(u, n) {
      var date = _this2.set(DATE, 1).set(u, n + number);

      return date.set(DATE, Math.min(_this2.$D, date.daysInMonth()));
    };

    if (unit === M) {
      return instanceFactory(M, this.$M);
    }

    if (unit === Y) {
      return instanceFactory(Y, this.$y);
    }

    var step;

    switch (unit) {
      case MIN:
        step = MILLISECONDS_A_MINUTE;
        break;

      case H:
        step = MILLISECONDS_A_HOUR;
        break;

      case D:
        step = MILLISECONDS_A_DAY;
        break;

      case W:
        step = MILLISECONDS_A_WEEK;
        break;

      case S:
        step = MILLISECONDS_A_SECOND;
        break;

      default:
        // ms
        step = 1;
    }

    var nextTimeStamp = this.valueOf() + number * step;
    return wrapper(nextTimeStamp, this);
  };

  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };

  _proto.format = function format(formatStr) {
    var _this3 = this;

    var str = formatStr || FORMAT_DEFAULT;
    var zoneStr = Utils.padZoneStr(this.$d.getTimezoneOffset());
    var locale = this.$locale();
    var weekdays = locale.weekdays,
        months = locale.months;

    var getShort = function getShort(arr, index, full, length) {
      return arr && arr[index] || full[index].substr(0, length);
    };

    return str.replace(REGEX_FORMAT, function (match) {
      if (match.indexOf('[') > -1) return match.replace(/\[|\]/g, '');

      switch (match) {
        case 'YY':
          return String(_this3.$y).slice(-2);

        case 'YYYY':
          return String(_this3.$y);

        case 'M':
          return String(_this3.$M + 1);

        case 'MM':
          return Utils.padStart(_this3.$M + 1, 2, '0');

        case 'MMM':
          return getShort(locale.monthsShort, _this3.$M, months, 3);

        case 'MMMM':
          return months[_this3.$M];

        case 'D':
          return String(_this3.$D);

        case 'DD':
          return Utils.padStart(_this3.$D, 2, '0');

        case 'd':
          return String(_this3.$W);

        case 'dd':
          return getShort(locale.weekdaysMin, _this3.$W, weekdays, 2);

        case 'ddd':
          return getShort(locale.weekdaysShort, _this3.$W, weekdays, 3);

        case 'dddd':
          return weekdays[_this3.$W];

        case 'H':
          return String(_this3.$H);

        case 'HH':
          return Utils.padStart(_this3.$H, 2, '0');

        case 'h':
        case 'hh':
          if (_this3.$H === 0) return 12;
          return Utils.padStart(_this3.$H < 13 ? _this3.$H : _this3.$H - 12, match === 'hh' ? 2 : 1, '0');

        case 'a':
          return _this3.$H < 12 ? 'am' : 'pm';

        case 'A':
          return _this3.$H < 12 ? 'AM' : 'PM';

        case 'm':
          return String(_this3.$m);

        case 'mm':
          return Utils.padStart(_this3.$m, 2, '0');

        case 's':
          return String(_this3.$s);

        case 'ss':
          return Utils.padStart(_this3.$s, 2, '0');

        case 'SSS':
          return Utils.padStart(_this3.$ms, 3, '0');

        case 'Z':
          return zoneStr;

        default:
          // 'ZZ'
          return zoneStr.replace(':', '');
      }
    });
  };

  _proto.diff = function diff(input, units, float) {
    var unit = Utils.prettyUnit(units);
    var that = dayjs(input);
    var diff = this - that;
    var result = Utils.monthDiff(this, that);

    switch (unit) {
      case Y:
        result /= 12;
        break;

      case M:
        break;

      case Q:
        result /= 3;
        break;

      case W:
        result = diff / MILLISECONDS_A_WEEK;
        break;

      case D:
        result = diff / MILLISECONDS_A_DAY;
        break;

      case H:
        result = diff / MILLISECONDS_A_HOUR;
        break;

      case MIN:
        result = diff / MILLISECONDS_A_MINUTE;
        break;

      case S:
        result = diff / MILLISECONDS_A_SECOND;
        break;

      default:
        // milliseconds
        result = diff;
    }

    return float ? result : Utils.absFloor(result);
  };

  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(M).$D;
  };

  _proto.$locale = function $locale() {
    // get locale object
    return Ls[this.$L];
  };

  _proto.locale = function locale(preset, object) {
    var that = this.clone();
    that.$L = parseLocale(preset, object, true);
    return that;
  };

  _proto.clone = function clone() {
    return wrapper(this.toDate(), this);
  };

  _proto.toDate = function toDate() {
    return new Date(this.$d);
  };

  _proto.toArray = function toArray() {
    return [this.$y, this.$M, this.$D, this.$H, this.$m, this.$s, this.$ms];
  };

  _proto.toJSON = function toJSON() {
    return this.toISOString();
  };

  _proto.toISOString = function toISOString() {
    // ie 8 return
    // new Dayjs(this.valueOf() + this.$d.getTimezoneOffset() * 60000)
    // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    return this.toDate().toISOString();
  };

  _proto.toObject = function toObject() {
    return {
      years: this.$y,
      months: this.$M,
      date: this.$D,
      hours: this.$H,
      minutes: this.$m,
      seconds: this.$s,
      milliseconds: this.$ms
    };
  };

  _proto.toString = function toString() {
    return this.$d.toUTCString();
  };

  return Dayjs;
}();

dayjs.extend = function (plugin, option) {
  plugin(option, Dayjs, dayjs);
  return dayjs;
};

dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;
dayjs.en = Ls[L];

var DateProto = Date.prototype;

var DAYJS = '__ZENJS_DAYJS__';
defineValue(DateProto, '$dayjs', function () {
  var $dayjs = this[DAYJS];

  if (!$dayjs || $dayjs.valueOf() !== +this) {
    return this[DAYJS] = dayjs(this);
  }

  return $dayjs;
});

defineValue(Date, '$parse', function (date) {
  var $dayjs = dayjs(date);
  var $date = $dayjs.toDate().$set(DAYJS, $dayjs);
  return $date;
});

/**
 * @type {Boolean} 当前是否是 Node 环境
 */
var inNode = typeof global !== 'undefined';

var root = inBrowser ? window : inNode ? global : {};

defineValue(root, 'dayjs', dayjs);

var ignore = 'clone_init_parse_toDate_toISOString_toJSON_toString_unix_valueOf'.split('_');
var isDayjs$1 = dayjs.isDayjs;
dayjs.extend(function (option, Dayjs) {
  keys(Dayjs.prototype).forEach(function (key) {
    key.indexOf('$') === 0 || ignore.indexOf(key) > -1 || install(key);
  });
});

function install(name) {
  defineValue(DateProto, '$' + name, function () {
    var $dayjs = this.$dayjs();
    var result = $dayjs[name].apply($dayjs, arguments);

    if (isDayjs$1(result)) {
      this.setTime(result.valueOf());
      this[DAYJS] = result;
      return this;
    }

    return result;
  });
}

defineValue(root, '$typeof', function (obj) {
  if (obj == null) return obj + '';
  return obj[isArray] ? 'array' : typeof obj;
});

var rBackSlant = /\+/g;

function toString$1(obj) {
  switch (typeof obj) {
    case 'string':
      return obj;

    case 'boolean':
      return obj ? 'true' : 'false';

    case 'number':
      return isFinite(obj) ? obj : '';

    default:
      return '';
  }
}

function stringify(obj) {
  var args = arguments;
  var sep = parametersDefault(args, 1, '&');
  var eq = parametersDefault(args, 2, '=');

  if (isObject(obj)) {
    return keys(obj).map(function (key) {
      return encodeURIComponent(toString$1(key)) + eq + encodeURIComponent(toString$1(obj[key]));
    }).join(sep);
  }

  return '';
}

function parse(str) {
  var args = arguments;
  var sep = parametersDefault(args, 1, '&');
  var eq = parametersDefault(args, 2, '=');
  var result = {};

  if (isString$1(str) === false) {
    return result;
  }

  str.split(sep).forEach(function (_value) {
    var cache = _value.replace(rBackSlant, '%20');

    var index = cache.indexOf(eq);
    var key, value;

    if (index > -1) {
      key = cache.substr(0, index);
      value = cache.substr(index + 1);
    } else {
      key = cache;
    }

    result[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return result;
}

defineValue(root, '$querystring', assign(false, [null, {
  stringify: stringify,
  parse: parse
}]));

/**
 * 在一个对象上定义/修改一个新属性的 get 描述符
 * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
 * @param {String} name 要定义或修改的属性的名称
 * @param {Function} get 将被定义或修改的 get 描述符
 * @param {any} options 将被定义或修改的属性描述符
 */

function defineGet(obj, name, get, options) {
  define(obj, name, {
    get: get
  }, options || defineGetPropertyOptions);
  return get;
}

/**
 * 返回传入的第一个参数
 * @param {any} arg 
 * @returns {any} arg
 */
function returnArg(arg) {
  return arg;
}

/**
 * 始终返回 true
 * @returns {Boolean} true
 */
function returnTrue() {
  return true;
}

/**
 * 始终返回 false
 * @returns {Boolean} false
 */
function returnFalse() {
  return false;
}

var ZenJS$1 = root.ZenJS = assign(false, [null, {
  polyfill: {
    assign: assign$1,
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
    isString: isString$1,
    isBoolean: isBoolean$1,
    isArray: isArray$1,
    isNumber: isNumber,
    isRegExp: isRegExp,
    isSet: isSet,
    isMap: isMap,
    isFunction: isFunction$1,
    isObject: isObject,
    isReferenceType: isReferenceType,
    mapSetToArray: mapSetToArray
  },
  config: {
    event: {
      modifiers: true,
      returnFalse: true
    }
  }
}]);

var guid = 1;
defineProperty(ZenJS$1, 'guid', {
  get: function () {
    return guid++;
  }
});

if (inBrowser) {
  defineValue(document, '$id', document.getElementById);
}

var addEventListener = 'addEventListener';
var removeEventListener = 'removeEventListener';
var DOMContentLoaded = 'DOMContentLoaded';
var load = 'load';

if (inBrowser) {
  defineValue(document, '$ready', function (func, data) {
    if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
      func.apply(window, data);
    } else {
      document[addEventListener](DOMContentLoaded, function callback() {
        document[removeEventListener](DOMContentLoaded, callback);
        func.apply(window, data);
      });
    }
  });
}

if (inBrowser) {
  defineValue(window, '$ready', function (func, data) {
    if (document.readyState === 'complete') {
      func.apply(window, data);
    } else {
      window[addEventListener](load, function callback() {
        window[removeEventListener](load, callback);
        func.apply(window, data);
      });
    }
  });
}

var ElementProto = inBrowser ? DomElement.prototype : undefined;

var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

function access(elem, _className, handle) {
  var classList = elem.classList;
  var className = (_className || '').match(rnothtmlwhite) || []; // 判断是 class 否存在

  if (handle === 'has') {
    var length = className.length;
    var index = 0;

    for (; index < length; index++) {
      if (classList.contains(className[index]) === false) {
        return false;
      }
    } // 以防传入空等值时返回 true


    return length !== 0;
  } // 切换 class
  else if (handle === null) {
      className.forEach(function (name) {
        classList[classList.contains(name) ? 'remove' : 'add'](name);
      });
    } // 正常添加删除
    else {
        className.forEach(function (name) {
          return classList[handle](name);
        });
      }

  return elem;
}

if (inBrowser) {
  defineValue(ElementProto, '$addClass', function (className) {
    return access(this, className, 'add');
  });
  defineValue(ElementProto, '$removeClass $deleteClass', function (className) {
    return access(this, className, 'remove');
  });
  defineValue(ElementProto, '$hasClass', function (className) {
    return access(this, className, 'has');
  });
  defineValue(ElementProto, '$toggleClass', function (className, tSwitch) {
    var handle = arguments.length > 1 ? tSwitch ? 'add' : 'remove' : null;
    return access(this, className, handle);
  });
}

if (inBrowser && !ElementProto.matches) {
  ['webkit', 'o', 'ms', 'moz'].$each(function (core) {
    var matchesKey = core + 'MatchesSelector';
    var matchesValue = ElementProto[matchesKey];

    if (matchesValue) {
      ElementProto.matches = matchesValue;
      return false;
    }
  });
}

var matches = ElementProto.matches;

if (inBrowser) {
  defineValue(ElementProto, '$is', function (selector) {
    return selector.nodeType ? this === selector : isString$1(selector) ? this.matches(selector) : false;
  });
  defineValue(ElementProto, '$not', function (selector) {
    return !this.$is(selector);
  });
}

/**
 * 
 * @param {Element} node 当前 DOM 元素, 也可是 DOM 元素数组
 * @param {String} filter 过滤元素的 CSS 选择器和方法
 * @param {String} handler 获取下一个 DOM 元素的属性名
 * @param {Boolean} checkSelf 检测完当前 DOM 元素后再检测其他 DOM 元素
 */

function Filter(node, filter, handler, checkSelf) {
  // 没有可过滤的元素
  if (node == null || node.length === 0) return node; // 没有过滤条件

  if (filter == null) {
    if (node.nodeType) {
      return checkSelf ? node : node[handler];
    }

    return node;
  } // 传入的 filter 是否是方法
  // 传入了方法则使用传入的方法进行过滤
  // 否则使用 $is 来进行过滤


  var filterIsFunction = filter[isFunction]; // Node

  if (node.nodeType) {
    // 首先检测当前 DOM 元素, 检测通过就直接返回
    if (checkSelf && (filterIsFunction ? filter(node) : node.$is(filter))) {
      return node;
    } // 检测没通过就去获取下一个 DOM 元素再进行检测


    if (filterIsFunction) {
      while ((node = node[handler]) && !filter(node)) {}
    } else {
      while ((node = node[handler]) && !node.$is(filter)) {}
    }

    return node;
  } // Node Array


  return node.filter(filterIsFunction ? filter : function (elem) {
    return elem.$is(filter);
  });
}
function dir(elem, handler) {
  var matched = [];
  var index = 0;

  while (elem = elem[handler]) {
    matched[index++] = elem;
  }

  return matched;
}

if (inBrowser) {
  defineValue(ElementProto, '$first $firstChild', function (filter) {
    return Filter(this.firstElementChild, filter, 'nextElementSibling', true);
  });
  defineValue(ElementProto, '$last $lastChild', function (filter) {
    return Filter(this.lastElementChild, filter, 'previousElementSibling', true);
  });
}

inBrowser && [['$next', 'nextElementSibling'], ['$prev', 'previousElementSibling']].forEach(function (arr) {
  var name = arr[0];
  var fn = arr[1];
  defineValue(ElementProto, name, function (filter) {
    return Filter(this, filter, fn);
  });
  defineValue(ElementProto, name + 'All', function (filter) {
    return Filter(dir(this, fn), filter);
  });
});

if (inBrowser) {
  defineValue(ElementProto, '$child $children', function (filter) {
    return Filter(slice.call(this.children), filter);
  });
}

if (inBrowser) {
  defineValue(ElementProto, '$parent', function (filter) {
    return Filter(this.parentElement, filter, null, true);
  });
  defineValue(ElementProto, '$parents', function (filter, checkSelf) {
    return Filter(this, filter, 'parentElement', checkSelf);
  });
}

if (inBrowser) {
  defineValue(ElementProto, '$siblings', function (filter) {
    var parent = this.parentElement;

    if (parent) {
      var children = slice.call(parent.children);
      return Filter(children.$splice(children.indexOf(this), 1), filter);
    }

    return [];
  });
}

if (inBrowser) {
  defineValue(ElementProto, '$append', function (elem) {
    return this.appendChild(elem), this;
  });
  defineValue(ElementProto, '$prepend', function (elem) {
    return this.insertBefore(elem, this.firstElementChild), this;
  });
  defineValue(ElementProto, '$appendTo', function (elem) {
    return elem.appendChild(this), this;
  });
  defineValue(ElementProto, '$prependTo', function (elem) {
    return elem.insertBefore(this, elem.firstElementChild), this;
  });
}

if (inBrowser) {
  defineValue(ElementProto, '$before', function (elem, parent) {
    if (parent = this.parentNode) {
      parent.insertBefore(elem, this);
    }

    return this;
  });
  defineValue(ElementProto, '$after', function (elem, parent) {
    if (parent = this.parentNode) {
      parent.insertBefore(elem, this.nextElementSibling);
    }

    return this;
  });
}

if (inBrowser) {
  defineValue(ElementProto, '$delete $remove', function (parent) {
    if (parent = this.parentNode) {
      parent.removeChild(this);
    }
  });
}

if (inBrowser) {
  [document, ElementProto].forEach(function (elem) {
    defineValue(elem, '$query $find', elem.querySelectorAll);
    defineValue(elem, '$queryFirst $findFirst', elem.querySelector);
  });
}

if (inBrowser) {
  defineValue(ElementProto, '$replaceWith $replace', function (elem, parent) {
    if (parent = this.parentNode) {
      parent.replaceChild(elem, this);
    }
  });
}

if (inBrowser) {
  defineGet(ElementProto, '_nodeName', function () {
    return this.nodeName.toLowerCase();
  });
}

var min = Math.min;

if (inBrowser) {
  define(ElementProto, '_index', {
    get: function () {
      return this.parentElement ? this.$prevAll().length : -1;
    },
    set: function (toIndex) {
      var parent = this.parentElement;

      if (parent == null) {
        return;
      }

      var siblings = parent.children;
      var selfIndex = this._index;
      var currentIndex = min(siblings.length - 1, toIndex);

      if (selfIndex === currentIndex) {
        return;
      }

      var currentElem = siblings[currentIndex];
      parent.insertBefore(this, selfIndex < currentIndex ? currentElem.nextElementSibling : currentElem);
    }
  });
}

if (inBrowser) {
  ['width', 'height'].forEach(function (prop) {
    define(ElementProto, "_".concat(prop), {
      get: function () {
        try {
          return this.getBoundingClientRect()[prop];
        } catch (error) {
          return 0;
        }
      },
      set: function (value) {
        this.style[prop] = $isNumber(value) ? value + 'px' : value;
      }
    });
  });
}

if (inBrowser) {
  define(ElementProto, '_html', {
    get: function () {
      return this.innerHTML;
    },
    set: function (value) {
      this.innerHTML = value;
    }
  });
}

var rreturn = /\r/g;

/**
 * Transplant from jQuery
 * Version: 3.3.1
 * Homepage: https://jquery.com
 */

if (inBrowser) {
  define(ElementProto, '_val _value', {
    get: function () {
      // 兼容性处理
      var hooks = valHooks[this.type] || valHooks[this._nodeName];
      var result;

      if (hooks && 'get' in hooks && (result = hooks.get(this)) !== undefined) {
        return result;
      }

      if (isString$1(result = this.value)) {
        return result.replace(rreturn, '');
      }

      return result == null ? '' : result;
    },
    set: function (value) {
      if (value == null) {
        value = '';
      } else if (isNumber(value)) {
        value += '';
      } else if (isArray$1(value)) {
        value = value.map(function (val) {
          return val == null ? '' : val + '';
        });
      }

      var hooks = valHooks[this.type] || valHooks[this._nodeName];

      if (!hooks || !('set' in hooks) || hooks.set(this, value) === undefined) {
        this.value = value;
      }
    }
  });
  var valHooks = {
    option: {
      get: function (elem) {
        var value = elem.getAttribute('value');
        return value == null ? (elem.textContent.match(rnothtmlwhite) || []).join(' ') : value;
      }
    },
    select: {
      get: function (elem) {
        var options = elem.options;
        var index = elem.selectedIndex;
        var one = elem.type === 'select-one';
        var max = one ? index + 1 : options.length;
        var values = one ? null : [];
        var value, option, i;

        if (index < 0) {
          i = max;
        } else {
          i = one ? index : 0;
        }

        for (; i < max; i++) {
          option = options[i];

          if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || option.parentNode._nodeName !== 'optgroup')) {
            value = valHooks.option.get(option);

            if (one) {
              return value;
            }

            values.push(value);
          }
        }

        return values;
      },
      set: function (elem, value) {
        var options = elem.options;
        var values = $toArray(value);
        var i = options.length;
        var optionSet, option;

        while (i--) {
          option = options[i];

          if (option.selected = values.$inArray(valHooks.option.get(option))) {
            optionSet = true;
          }
        }

        if (!optionSet) {
          elem.selectedIndex = -1;
        }

        return values;
      }
    }
  };
  var input = document.createElement('input');
  input.type = 'checkbox'; // checkbox 的默认值应该为 'on'

  if (input.value !== '') {
    ['radio', 'checkbox'].forEach(function (type) {
      valHooks[type] = {
        get: function (elem) {
          return elem.getAttribute('value') === null ? 'on' : elem.value;
        }
      };
    });
  }
}

/**
 * @type {EventTarget}
 */

var DomEventTarget = inBrowser ? 'EventTarget' in window ? EventTarget.prototype : [window, document, ElementProto] : undefined;

var DATA = '__ZENJS_DATA__';
/**
 * 获取存储在元素上的整个数据集, 如数据集不存在则创建
 * @param {Element} elem
 * @returns {Object}
 */

function getDatas(elem) {
  return elem[DATA] || (defineValue(elem, DATA, {}), elem[DATA]);
}

if (inBrowser) {
  defineValue(DomEventTarget, '$data', function $data(name, value, weakRead) {
    var self = this || window;
    var Data = getDatas(self); // $data( {} )
    // $data( {}, weakRead )

    if (isObject(name)) {
      for (var key in name) {
        $data.call(self, key, name[key], value);
      }

      return self;
    } // 读取
    // $data( name )
    // $data( name, value, true )


    if (weakRead || arguments.length < 2) {
      if (name == null) return Data;
      if (weakRead && !(name in Data)) return Data[name] = value;
      return Data[name];
    } // $data( name, value )


    Data[name] = value;
    return self;
  });
  defineValue(DomEventTarget, '$hasData', function (name) {
    var Data = getDatas(this || window);

    if (isEmptyObject(Data)) {
      return false;
    }

    if (name == null) {
      return true;
    }

    return name in Data;
  });
  defineValue(DomEventTarget, '$deleteData $removeData', function (names) {
    var self = this || window;

    if (names == null) {
      self[DATA] = {};
      return self;
    }

    var Data = getDatas(self);
    (names.match(rnothtmlwhite) || []).forEach(function (name) {
      delete Data[name];
    });
    return self;
  });
}

/**
 * @type {Boolean} 当前环境是否支持 addEventListener 的 passive 属性
 */

var supportsPassiveEvent = false;

try {
  var options = defineProperty({}, 'passive', {
    get: function () {
      supportsPassiveEvent = true;
    }
  });
  window[addEventListener]('test', null, options);
} catch (e) {}

var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

/**
 * 根据传入命名空间, 调用一些功能或做一些判断
 * @param {String} name 需要解析哪一块的功能命名空间
 * @param {Array} namespace 元素的命名空间列表
 * @param {Element} elem 绑定事件的元素
 * @param {String} type 绑定的事件
 * @param {Object} options 其他属性
 */

function modifiers(name, namespace, elem, type, options) {
  // 没有命名空间
  if (namespace.length === 0) {
    return;
  }
  /** 当前功能的修饰符列表 */


  var handlers = ModifiersList[name];
  var result;
  namespace.filter(function (name) {
    return name in handlers;
  }).$each(function (handler) {
    return result = handlers[handler](elem, type, options, namespace);
  });
  return result;
}
var ModifiersList = {
  /**
   * 添加事件时
   */
  add: {},

  /**
   * 触发事件时
   */
  dispatch: {
    /**
     * 当事件是从绑定的元素本身触发时才触发回调
     */
    self: function (elem, type, event) {
      return event.target === event.currentTarget;
    }
  }
};
var add = ModifiersList.add;
var dispatch = ModifiersList.dispatch;
/**
 * .once || .one
 * 当命名空间有 .once 或 .one, 则会去已绑定的事件中进行查找,
 * 如果之前绑定过相同的命名空间 ( 也同样有 .once 或 .one ), 则本次绑定无效
 */

add.once = add.one = function (elem, type, events, namespace) {
  events = events[type] || [];
  return events.$findIndex(equals$1, {
    namespace: namespace
  }) === -1;
};
/**
 * .ctrl || .shift || .alt || .meta
 * 当按下了对应键盘按键时才触发回调
 */


['ctrl', 'shift', 'alt', 'meta'].forEach(function (key) {
  dispatch[key] = function (elem, type, event) {
    return !!event[key + 'Key'];
  };
});
/**
 * .left || .middle || .right
 * 当按下了对应鼠标按键时才触发回调
 */

['left', 'middle', 'right'].forEach(function (button, index) {
  dispatch[button] = function (elem, type, event) {
    return !('button' in event && event.button !== index);
  };
});

function init(elem, types, whileFn, whileEndFn) {
  /** 存放当前元素下的所有事件 */
  var events = elem.$data('events', {}, true);
  /** 事件总数 */

  var length = types.length;
  var tmp, type, namespace, rNamespace, handlers, handlersLength;

  while (length--) {
    /** 分离事件名称和命名空间 */
    tmp = rtypenamespace.exec(types[length]) || [];
    /** 事件名称 */

    type = tmp[1];
    if (!type) continue;
    /** 事件集 */

    handlers = events[type] || [];
    /** 事件集数量 */

    handlersLength = handlers.length;
    if (!handlersLength) continue;
    /** 命名空间 */

    namespace = (tmp[2] || '').split('.').sort().join('.');
    /** 匹配命名空间 */

    rNamespace = tmp[2] && new RegExp('^' + namespace + '$');

    while (handlersLength--) {
      whileFn(handlers[handlersLength], rNamespace, type, handlers, handlersLength);
    }

    whileEndFn && whileEndFn(handlers, events, type);
  }
}
/**
 * 所有事件分组的存储
 */

var groups = {// group1: [
  //   handleOptions1,
  //   handleOptions2
  // ]
};

/**
 * 事件处理 => 绑定事件
 * @private
 * @param {Element} elem 需要绑定事件的对象
 * @param {Array} types 需要绑定的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} listener 绑定的事件
 * @param {Object} options 事件绑定参数
 * @param {String} group 事件分组参数
 * @param {Object} data 传递给事件的数据
 */

function add$1(elem, types, selector, listener, options, group, data) {
  /** 存放当前元素下的所有事件 */
  var events = elem.$data('events', {}, true);
  /** 事件 GUID */

  var guid = listener.guid || (listener.guid = ZenJS$1.guid);
  /** 事件总数 */

  var length = types.length;
  var tmp, type, namespace, handleOptions; // 遍历绑定所有事件

  while (length--) {
    /** 分离事件名称和命名空间 */
    tmp = rtypenamespace.exec(types[length]) || [];
    /** 事件名称 */

    type = tmp[1];
    if (!type) continue;
    /** 命名空间 */

    namespace = (tmp[2] || '').split('.').sort(); // 处理功能性命名空间

    if (ZenJS$1.config.event.modifiers && modifiers('add', namespace, elem, type, events) === false) {
      continue;
    }
    /** 该事件所有相关参数 */


    handleOptions = {
      elem: elem,
      selector: selector,
      type: type,
      namespace: namespace,
      listener: listener,
      guid: guid,
      options: options,
      group: group,
      data: data,
      namespaceStr: namespace.join('.'),
      handler: function () {
        return ZenJS$1.EventListener.dispatch(this, arguments, handleOptions);
      }
    }; // 存储相关数据

    (events[type] || (events[type] = [])).push(handleOptions); // 存储分组数据

    if (group) {
      (groups[group] || (groups[group] = [])).push(handleOptions);
    } // 绑定事件


    if (options.passive) {
      elem[addEventListener](type, handleOptions.handler, {
        passive: true,
        capture: options.capture || false
      });
    } else {
      elem[addEventListener](type, handleOptions.handler, options.capture || false);
    }
  }
}

/**
 * 事件处理 => 触发事件
 * @param {DocumentEventMap} nativeEvent 当前触发的事件对象
 */

function dispatch$1(self, oArgs, handleOptions) {
  /** 重写的 event 事件对象 */
  var event = new ZenJS$1.Event(oArgs[0]);
  /** 新 argument, 存放了新的 event 事件对象 */

  var args = slice.call(oArgs).$splice(0, 1, event);
  /** 事件委托选择器 */

  var selector = handleOptions.selector;
  /**  */

  var target = event.target,
      type = event.type;
  var elem = handleOptions.elem;
  event.delegateTarget = elem;
  event.handleOptions = handleOptions; // 有事件委托

  if (selector && !(type === 'click' && event.button >= 1)) {
    // 从被点击的元素开始, 一层一层往上找
    for (; target !== elem; target = target.parentNode || elem) {
      // 是元素节点
      // 点击事件, 将不处理禁用的元素
      if (target.nodeType === 1 && !(type === 'click' && target.disabled === true) && target.matches(selector)) {
        elem = event.currentTarget = target;
        break;
      }
    }

    if (event.delegateTarget === elem) {
      return;
    }
  }

  if (!event.currentTarget) {
    event.currentTarget = elem;
  }

  if (!target) {
    event.target = elem;
  } // 处理功能性命名空间


  if (ZenJS$1.config.event.modifiers && modifiers('dispatch', handleOptions.namespace, elem, type, event) === false) {
    return;
  }

  var result = handleOptions.listener.apply(self, args); // 返回 false, 阻止浏览器默认事件和冒泡

  if (result === false && ZenJS$1.config.event.returnFalse) {
    event.preventDefault();
    event.stopPropagation();
  }

  return result;
}

/**
 * 事件处理 => 移除事件
 * @param {Element} elem 
 * @param {Array} types 
 * @param {Function} listener 
 * @param {String} selector 
 */

function remove(elem, types, listener, selector) {
  init(elem, types, function (handleOptions, rNamespace, type, handlers, handlersLength) {
    // 检查注入到方法上的 guid 是否相同 ( 如果有 )
    if (!listener || listener.guid === handleOptions.guid) {
      // 检查命名空间是否相同 ( 如果有 )
      if (!rNamespace || rNamespace.test(handleOptions.namespaceStr)) {
        // 检查事件委托
        if (selector // 允许所有绑定的事件通过, 不管有没有事件委托
        ? selector === '**' || // 允许所有有事件委托的事件通过
        selector === '*' && handleOptions.selector || // 事件委托必须相同才能通过
        selector === handleOptions.selector // 允许所有没事件委托的事件通过
        : !handleOptions.selector) {
          // 移除事件
          elem[removeEventListener](type, handleOptions.handler); // 移除事件缓存

          handlers.splice(handlersLength, 1); // 移除分组缓存

          var group = handleOptions.group;

          if (group && !groups[group].$deleteValue(handleOptions).length) {
            delete groups[group];
          }
        }
      }
    }
  }, function (handlers, events, type) {
    if (!handlers.length) {
      delete events[type];
    }
  });
}

/**
 * 事件处理 => 触发事件
 * @param {Element} elem 
 * @param {Array} types 
 * @param {Array} data 
 */

function emit(elem, types, data) {
  init(elem, types, function (handleOptions, rNamespace, type) {
    // 检查命名空间是否相同 ( 如果有 )
    if (!rNamespace || rNamespace.test(handleOptions.namespaceStr)) {
      // 检查事件委托 ( 不触发有事件委托的方法 )
      if (!handleOptions.selector) {
        handleOptions.handler.apply(handleOptions.elem, [type].concat(data));
      }
    }
  });
}

var EventListener = ZenJS$1.EventListener = assign(false, [null, {
  add: add$1,
  dispatch: dispatch$1,
  modifiers: modifiers,
  remove: remove,
  emit: emit
}]);

/**
 * 绑定事件 => 参数处理
 * @param {Element} elem 需要绑定事件的对象
 * @param {String} types 需要绑定的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} listener 绑定的事件
 * @param {Object} options 事件绑定参数
 * @param {Boolean} once 事件只执行一次
 */

function on(elem, types, selector, listener, options, once) {
  var events;
  var group, data; // 1. on( elem, { type: listener || Boolean } )
  // 2. on( elem, { type: listener || Boolean }, options )
  // 3. on( elem, { type: listener || Boolean }, options, selector )
  // 4. on( elem, { type: listener || Boolean }, selector )
  // 5. on( elem, { type: listener || Boolean }, selector, options )

  if (isObject(types)) {
    events = types;

    if (isString$1(selector)) {
      // 4, 5
      options = listener;
    } else {
      // 1, 2, 3
      options = selector;
      selector = listener;
    }
  } // on( elem, selector, { type: listener || Boolean } )
  // on( elem, selector, { type: listener || Boolean }, options )
  else if (isObject(selector)) {
      events = selector;
      selector = types;
      options = listener;
    }

  if (events) {
    for (var type in events) {
      on(elem, type, events[type], selector, options);
    }

    return elem;
  }

  if (!types) return elem;else {
    types = types.match(rnothtmlwhite);

    if (types == null || types.length === 0) {
      return elem;
    }
  } // on( elem, types, listener || Boolean )
  // on( elem, types, listener || Boolean, selector )
  // on( elem, types, listener || Boolean, selector, options )

  if (!isString$1(selector)) {
    var _ref = [listener, selector];
    selector = _ref[0];
    listener = _ref[1];

    // on( elem, types, listener || Boolean, options )
    // on( elem, types, listener || Boolean, options, selector )
    if (!isString$1(selector) && (options === undefined || isString$1(options))) {
      var _ref2 = [selector, options];
      options = _ref2[0];
      selector = _ref2[1];
    }
  }

  if (isBoolean$1(listener)) {
    listener = listener ? returnTrue : returnFalse;
  }

  if (!listener) {
    return elem;
  } // useCapture


  if (isBoolean$1(options)) {
    options = {
      capture: options
    };
  }

  options = options || {}; // group
  // 事件分组功能, 分到同一组的事件可进行同时移除

  if ('group' in options) {
    group = options.group;
    delete options.group;
  }

  if ('data' in options) {
    data = options.data;
    delete options.data;
  }

  keys(options).forEach(function (key) {
    options[key] ? options[key] = true : delete options[key];
  });

  if (once || options.one || options.once) {
    var origListener = listener;

    listener = function (event) {
      elem.$off(event);
      return origListener.apply(this, arguments);
    };

    listener.guid = origListener.guid || (origListener.guid = ZenJS$1.guid);
    delete options.one;
    delete options.once;
  }

  if (options.passive && !supportsPassiveEvent) {
    delete options.passive;
  }

  EventListener.add(elem, types, selector, listener, options, group, data);
  return elem;
}

if (inBrowser) {
  defineValue(DomEventTarget, '$on', function (types, selector, listener, options) {
    var elem = this || window;
    return on(elem, types, selector, listener, options);
  });
  defineValue(DomEventTarget, '$one $once', function (types, selector, listener, options) {
    var elem = this || window;
    return on(elem, types, selector, listener, options, true);
  });
}

/**
 * 移除事件 => 参数处理
 * @param {*} types 
 * @param {*} selector 
 * @param {*} listener 
 * @param {*} options 
 */

function off(elem, types, selector, listener) {
  // $off( ZenJS.Event )
  if (types instanceof ZenJS.Event) {
    return offByHandleOptions(types.handleOptions);
  } // $off( object, selector )
  // $off({
  //   group: 'group1'
  // })


  if (isObject(types)) {
    //   group: 'group1'
    // })

    if ('group' in types) {
      groups[types.group].slice().forEach(function (handleOptions) {
        offByHandleOptions(handleOptions);
      });
    } // $off( object, selector )
    else {
        for (var type in types) {
          off(elem, type, selector, types[type]);
        }
      }

    return elem;
  }

  if (!types) return elem;else {
    types = types.match(rnothtmlwhite);

    if (types == null || types.length === 0) {
      return elem;
    }
  } // $off( types, listener )
  // $off( types, listener, selector )

  if (selector !== undefined && !isString$1(selector)) {
    var _ref = [listener, selector];
    selector = _ref[0];
    listener = _ref[1];
  } // $off( types, true || false )


  if (isBoolean$1(listener)) {
    listener = listener ? returnTrue : returnFalse;
  }

  EventListener.remove(elem, types, listener, selector);
  return elem;
}

function offByHandleOptions(handleOptions) {
  var namespace = handleOptions.namespaceStr;
  var handleTypes = namespace ? "".concat(handleOptions.type, ".").concat(namespace) : handleOptions.type;
  return off(handleOptions.elem, handleTypes, handleOptions.selector, handleOptions.listener);
}

if (inBrowser) {
  defineValue(DomEventTarget, '$off', function (types, selector, listener) {
    var elem = this || window;
    return off(elem, types, selector, listener);
  });
}

/**
 * 触发事件 => 参数处理
 * @param {String} types 
 * @param {any} args 
 */

function emit$1(elem, types, args) {
  if (!types) return elem;else {
    types = types.match(rnothtmlwhite);

    if (types == null || types.length === 0) {
      return elem;
    }
  }
  EventListener.emit(elem, types, parametersRest(args, 1));
  return elem;
}

if (inBrowser) {
  defineValue(DomEventTarget, '$emit', function (types) {
    var elem = this || window;
    return emit$1(elem, types, arguments);
  });
}

/*
 * event.target : 触发事件的元素
 * event.originalTarget : 绑定事件的元素, 如果是委托代理, 则为代理的元素
 * event.delegateTarget : 绑定事件的元素
 * event.relatedTarget : 事件的相关节点, mouseover 时移出的节点, mouseout 时移入的节点
 *
 * event.preventDefault() : 阻止浏览器默认行为
 * event.stopPropagation() : 停止将事件冒泡到父节点
 * event.stopImmediatePropagation() : 停止将事件冒泡到父节点且停止当前元素后续事件执行
 */

var Event = ZenJS$1.Event = function (src, props) {
  if (this instanceof Event === false) {
    return new ZenJS$1.Event(src, props);
  }

  if (src instanceof Event) {
    return src;
  } // Event object


  if (src && src.type) {
    this.originalEvent = src;
    this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
    this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

    for (var key in src) {
      if (!(key in this)) {
        this[key] = src[key];
      }
    }
  } // Event type
  else {
      this.type = src;
    }

  if (props) {
    assign$1(this, props);
  }

  this.timeStamp = src && src.timeStamp || Date.now();
};

var EventProto = Event.prototype = {
  constructor: Event
};
['preventDefault', 'stopPropagation', 'stopImmediatePropagation'].forEach(function (fn) {
  EventProto[fn] = function () {
    if (this.originalEvent) {
      this.originalEvent[fn]();
    }
  };
});

var addProp = Event.addProp = function (name, get) {
  defineProperty(EventProto, name, {
    enumerable: true,
    configurable: true,
    get: isFunction$1(get) ? function () {
      if (this.originalEvent) return get(this.originalEvent);
    } : function () {
      return this[name];
    },
    set: function (value) {
      this[name] = value;
    }
  });
};

var rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;
addProp('which', function (event) {
  var button;

  if (event.which == null && rkeyEvent.test(event.type)) {
    return event.charCode != null ? event.charCode : event.keyCode;
  }

  if (!event.which && (button = event.button) !== undefined && rmouseEvent.test(event.type)) {
    if (button & 1) return 1;
    if (button & 2) return 3;
    if (button & 4) return 2;
    return 0;
  }

  return event.which;
});

export default ZenJS$1;
