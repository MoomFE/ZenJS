/*!
 * Zen.js v2.3.0
 * (c) 2018 Zhang_Wei
 * Released under the MIT License.
 */

'use strict';

var isArray = Array.isArray;

var defineProperty = Object.defineProperty;

/**
 * 判断传入对象是否是 Object 类型, 并且不为 null
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

var ObjectProto = Object.prototype;

var toString = ObjectProto.toString;

var getPrototypeOf = Object.getPrototypeOf;

var hasOwnProperty = Object.hasOwnProperty;

/**
 * 判断传入对象是否是 Function 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
function isFunction(obj) {
  return typeof obj === 'function';
}

var fnToString = hasOwnProperty.toString,
    ObjectFunctionString = fnToString.call(Object);

function $isPlainObject(obj) {

  if (!obj || toString.call(obj) !== '[object Object]') {
    return false;
  }

  var proto = getPrototypeOf(obj);

  if (!proto) {
    return true;
  }

  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;

  return isFunction(Ctor) && fnToString.call(Ctor) === ObjectFunctionString;
}

var create = Object.create;

/**
 * 判断传入对象是否是 Boolean 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
function isBoolean(obj) {
  return typeof obj === 'boolean';
}

function $assign() {

  var i = 1,
      length = arguments.length,

  /** 目标对象 */
  target = arguments[0] || {},
      options,
      name,
      src,
      copy,
      copyIsArray,
      clone,


  /** 浅拷贝 */
  shallow = false;

  if (isBoolean(target)) {
    shallow = target;
    target = arguments[i] || {};
    i++;
  }

  // 遍历所有的传入参数
  for (; i < length; i++) {

    // 判断当前传入参数是有效的
    if ((options = arguments[i]) != null) {

      // 遍历传入参数的属性
      for (name in options) {

        // 判断传入参数的属性是否和目标对象相同
        // 是相同则跳出, 防止无限拷贝
        if ((copy = options[name]) === target) {
          continue;
        }

        src = target[name];

        // 如果被该属性是原生对象或数组, 则进循环拷贝
        if (!shallow && copy && ($isPlainObject(copy) || (copyIsArray = isArray(copy)))) {

          // 目标对象的当前属性是否和该属性类型相同
          // 不是的话, 则进行覆盖
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && isArray(src) ? src : [];
          } else {
            clone = src && $isPlainObject(src) ? src : this === true ? create(null) : {};
          }

          target[name] = $assign(clone, copy);
        } else if (copy !== undefined) {

          // 该属性不是原生对象和数组, 直接进行赋值
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

/**
 * 在一个对象上定义/修改一个新属性 ( 对 Object.defineProperty 的封装 )
 * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
 * @param {String} name 要定义或修改的属性的名称
 * @param {any} options 将被定义或修改的属性描述符
 * @param {any} options2 将被定义或修改的属性描述符, 会覆盖前一个 options
 */
function define(obj, name, options, options2) {
  var key;

  if (obj == null) {
    return;
  }

  // define( [ window, document ], name, options )
  if (isArray(obj) && obj instanceof Array) {
    obj.forEach(function (obj) {
      return define(obj, name, options, options2);
    });
    return;
  }

  // define( window, { key: value }, options )
  if (isObject(name)) {
    for (key in name) {
      define(obj, key, name[key], options);
    }
    return;
  }

  name.split(' ').forEach(function (name) {
    defineProperty(obj, name, $assign(true, {}, options, options2));
  });
}

var definePropertyOptions = {
  configurable: true, // 删除/定义
  enumerable: false, // 枚举
  writable: true // 写入
};

var defineGetPropertyOptions = {
  configurable: true, // 删除/定义
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
  var key;

  if (isObject(name)) {
    for (key in name) {
      defineValue(obj, key, name[key], options);
    }
    return name;
  }

  return define(obj, name, { value: value }, options || definePropertyOptions), value;
}

var ArrayProto = Array.prototype;

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

var slice = ArrayProto.slice;

/**
 * 判断传入对象是否是 String 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
function isString(obj) {
  return typeof obj === 'string';
}

var reHasUnicode = /[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/;

var reUnicode = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g;

function $toArray(value) {
  if (!value) {
    return [];
  }
  if (isString(value)) {
    if (reHasUnicode.test(value)) {
      return value.match(reUnicode) || [];
    } else {
      return value.split('');
    }
  }
  return slice.call(value);
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
    return $toArray(args).$get(index, length);
  }
  return [];
}

/**
 * 将一个传入的数组的下标修复到正确的位置上
 * @param {Array} array 原数组
 * @param {Number} index 传入的下标, 可为负数
 * @param {Number} add 额外值
 * @returns {Number}
 */
function fixArrayIndex(array, index, add) {
  if (index < 0 && (index = array.length + index + (add || 0)) < 0) {
    index = 0;
  }
  return index;
}

function $add(self, index, args) {

  var len = args.length;

  index = fixArrayIndex(self, index, 1);

  for (var i = 0; i < len; i++) {
    self.splice(index++, 0, args[i]);
  }

  return self;
}

defineValue(ArrayProto, '$add', function (index) {
  return $add(this, index, parametersRest(arguments, 1));
});

function $create(length, insert) {
  var i = 0;
  var result = Array(length >>= 0);

  if (isFunction(insert)) {
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

defineValue(Array, '$create', $create);

var ceil = Math.ceil;

function $chunk(array, size) {
  var length;

  if (!array || size < 1 || !(length = array.length)) {
    return [];
  }

  return $create(ceil(length / size), function (index) {
    var start = index * size;
    return array.slice(start, start + size);
  });
}

defineValue(Array, '$chunk', $chunk);

defineValue(ArrayProto, '$concat', function () {
  var _this = this;

  $toArray(arguments).forEach(function (arg) {
    $add(_this, -1, isArray(arg) ? arg : [arg]);
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
    $add(_this2, increasedLength + index, isArray(arg) ? arg : [arg]);
    // 用于修正 index, 后续的 arg 需要插入到前面的 arg 后面
    increasedLength = _this2.length - originLength;
  });

  return this;
});

defineValue(Array, '$copy', function (source, array) {
  return array ? array.concat(source) : source.slice();
});

defineValue(ArrayProto, '$delete $remove', function (index, noop, returnDeleted) {
  var num = parametersDefault(arguments, 1, 1);
  var deleted = this.splice(index, num);

  return returnDeleted ? deleted : this;
});

/**
 * 判断传入的两个参数是否全等
 * @param {any} one 需要判断的第一参数
 * @param {any} two 需要判断的第二参数
 * @returns {Boolean}
 */
function congruence(one, two) {
  return one === two;
}

/**
 * 判断传入的两个参数是否相等
 * @param {any} one 需要判断的第一参数
 * @param {any} two 需要判断的第二参数
 * @returns {Boolean}
 */
function equals(one, two) {
  return one == two;
}

defineValue(ArrayProto, '$deleteValue $removeValue', function (value) {
  var isEqual = parametersDefault(arguments, 1, true) ? congruence : equals;
  var index = 0,
      length = this.length;

  for (; index < length;) {
    if (isEqual(this[index], value)) {
      this.$delete(index);
      length--;
    } else {
      index++;
    }
  }

  return this;
});

defineValue(ArrayProto, '$each', function (callback) {
  var index = 0,
      length = this.length,
      value;

  for (; index < length; index++) {
    value = this[index];

    if (callback.call(value, value, index, this) === false) {
      break;
    }
  }

  return this;
});

defineValue(ArrayProto, '$equals', function (obj) {

  if (!obj) {
    return false;
  }

  var index = 0,
      length = this.length;

  if (length !== obj.length) {
    return false;
  }

  var isEqual = parametersDefault(arguments, 1, true) ? congruence : equals;

  for (; index < length; index++) {
    if (!isEqual(this[index], obj[index])) {
      return false;
    }
  }

  return true;
});

/**
 * 判断一个对象不是对象类型和方法类型
 * @param {*} obj 需要判断的对象
 */
function unFunctionObject(obj) {
  var type = typeof obj;
  return type !== 'object' && type !== 'function';
}

/**
 * 判断传入对象是否是 Number 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
function isNumber(obj) {
  return typeof obj === 'number';
}

var MAX_SAFE_INTEGER = 9007199254740991;

function $isArrayLike(obj) {
  if (obj != null && !isFunction(obj)) {
    var length = obj.length;
    if (isNumber(length) && length > -1 && length % 1 === 0 && length <= MAX_SAFE_INTEGER) {
      return true;
    }
  }
  return false;
}

defineValue(Array, '$isArrayLike', $isArrayLike);

var keys = Object.keys;

var stringify = JSON.stringify;

function $equals(obj, obj2, parent) {
  var index,
      length,
      key,
      oIsArray,
      oString;

  if (obj === obj2) {
    return true;
  }

  if (!obj || parent && parent === obj) {
    return false;
  } else if (toString.call(obj) !== toString.call(obj2)) {
    return false;
  } else if (unFunctionObject(obj)) {
    return false;
  } else if ($isPlainObject(obj) || (oIsArray = isArray(obj))) {
    if (oIsArray) {
      if (obj.length !== obj2.length) {
        return false;
      }
      for (index = 0, length = obj.length; index < length; index++) {
        if (!$equals(obj[index], obj2[index], obj)) {
          return false;
        }
      }
    } else {
      if (keys(obj).length !== keys(obj2).length) {
        return false;
      }
      for (key in obj) {
        if (!$equals(obj[key], obj2[key], obj)) {
          return false;
        }
      }
    }
  } else if (isFunction(obj.toString) && !(oString = obj.toString()).substr(0, 8) === '[object ') {
    if (obj2.toString() !== oString) {
      return false;
    }
  } else {
    try {
      if (stringify(obj) !== stringify(obj2)) {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  return true;
}

defineValue(Object, '$equals', $equals);

defineValue(ArrayProto, '$findIndex', function (key) {
  return findIndex(this, key, arguments);
});

function findIndex(self, key, args) {
  var length;

  if (key == null || !(length = self.length)) {
    return -1;
  }

  // 第一个参数不是数组或对象
  // 将所有传入参数转为数组
  if (unFunctionObject(key)) {
    key = $toArray(args);
  }

  // 将类数组类型的按照键值对进行分割
  if ($isArrayLike(key)) {
    key = $chunk(key, 2);
  }

  // 获取检测方法
  var predicate = getPredicate(key);

  // 遍历数组内的对象, 交给检测方法进行检测
  for (var index = 0; index < length; index++) {
    if (predicate(self[index])) {
      return index;
    }
  }
  return -1;
}

function getPredicate(key) {
  // fn array object
  // 用户传的检测方法
  if (isFunction(key)) {
    return key;
  }

  var keyIsArray = isArray(key);

  return function (object) {
    if (object == null || !keys(object).length) {
      return false;
    }
    return (keyIsArray ? checkArray : checkObject)(key, object);
  };
}

function checkArray(source, object) {
  var index = 0,
      chunk,
      key;
  var length = source.length;

  // 遍历检测对象
  for (; index < length; index++) {
    chunk = source[index];
    key = chunk[0];

    if (!(key in object && (chunk.length === 1 || $equals(chunk[1], object[key])))) {
      return false;
    }
  }

  return true;
}

function checkObject(source, object) {
  var key;

  for (key in source) {
    if (!(key in object && $equals(source[key], object[key]))) {
      return false;
    }
  }

  return true;
}

defineValue(ArrayProto, '$find', function (key) {
  var index = findIndex(this, key, arguments);

  return index === -1 ? null : this[index];
});

defineValue(ArrayProto, '$get', function () {
  var index = fixArrayIndex(this, parametersDefault(arguments, 0, 0));

  if (arguments.length <= 1) {
    return this[index];
  }

  var num = parametersDefault(arguments, 1, 1);

  return this.slice(index, num + index);
});

defineValue(ArrayProto, '$inArray', function (obj) {
  var i = 0,
      len = this.length;

  for (; i < len; i++) {
    if (this[i] == obj) return true;
  }return false;
});

defineValue(ArrayProto, '$move', function (from, to) {
  this.splice(to < 0 ? this.length + to : to, 0, this.splice(from, 1)[0]);
  return this;
});

defineValue(ArrayProto, '$moveRange', function (start, moveCount, toIndex) {
  return $add(this, toIndex, this.splice(start, moveCount));
});

// defineValue( ArrayProto, '$moveRange2', function( start, moveCount, toIndex ){

// });

'push_unshift_pop_shift'.split('_').forEach(function (key) {
  defineValue(ArrayProto, "$" + key, function () {
    return this[key].apply(this, arguments), this;
  });
});

defineValue(ArrayProto, '$set $edit', function (index, value) {

  if (typeof index === 'object') {
    var key;
    for (key in index) {
      $set(this, key, index[key]);
    }
  } else {
    $set(this, index, value);
  }

  return this;
});

function $set(array, index, value) {

  index = fixArrayIndex(array, index);

  array.splice(index, 1, value);
}

/**
 * 获取传入数字的小数位长度
 * @param {Number} num
 * @returns {Number}
 */
function getDecimalLength(num) {
  return (('' + num).split('.')[1] || '').length;
}

var pow = Math.pow;

var max = Math.max;

/**
 * 返回传入值
 * @param {any} arg 
 * @returns {any} arg
 */
function returnArg(arg) {
  return arg;
}

/**
 * 构造并返回一个新字符串, 该字符串包含被连接在一起的指定数量的字符串的副本.
 * String.prototype.repeat polyfill
 * @param {String} str 需要重复的字符串
 * @param {Number} count 需要重复的次数
 */
function repeat(str, count) {
  var result = '';
  var i = 0;

  for (; i++ < count;) {
    result += str;
  }

  return result;
}

function $plus(num1, num2) {
  return handler(num1, num2, plus);
}

function $addPlus() {
  return handlerPlus(arguments, plus);
}

defineValue(Math, {
  '$plus $jia': $plus,
  '$plusPlus $jiaPlus': $addPlus
});

function plus(num1, num2) {
  return num1 + num2;
}

function handler(num1, num2, handlerFn, lastHandlerFn) {
  var decimal1 = getDecimalLength(num1 = num1 || 0);
  var decimal2 = getDecimalLength(num2 = num2 || 0);
  var maxDecimal = max(decimal1, decimal2);
  var exponent = maxDecimal ? pow(10, maxDecimal) : 1;

  if (maxDecimal) {
    num1 = integer(num1, decimal1, maxDecimal);
    num2 = integer(num2, decimal2, maxDecimal);
  }

  return (lastHandlerFn || returnArg)(handlerFn(num1, num2) / exponent, exponent);
}

function handlerPlus(args, reduceFn, lastHandlerFn) {
  var nums = slice.call(args).map(function (num) {
    return num || 0;
  });
  var decimals = nums.map(function (num) {
    return getDecimalLength(num);
  });
  var maxDecimal = max.apply(null, decimals);
  var exponent = maxDecimal ? pow(10, maxDecimal) : 1;

  if (maxDecimal) {
    nums = nums.map(function (num, index) {
      return integer(num, decimals[index], maxDecimal);
    });
  }

  return (lastHandlerFn || returnArg)(nums.reduce(reduceFn) / exponent, exponent, nums);
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
}

function $multiply(num1, num2) {
  return handler(num1, num2, multiply, lastHandler);
}

function $multiplyPlus() {
  return handlerPlus(arguments, multiply, lastHandler);
}

defineValue(Math, {
  '$multiply $cheng': $multiply,
  '$multiplyPlus $chengPlus': $multiplyPlus
});

function multiply(num1, num2) {
  return num1 * num2;
}

function lastHandler(num, exponent, nums) {
  return num / getDividend(exponent, nums);
}

function getDividend(exponent, nums) {
  return nums ? pow(exponent, nums.length - 1) : exponent;
}

function $divide(num1, num2) {
  return handler(num1, num2, divide, lastHandler$1);
}

function $dividePlus() {
  return handlerPlus(arguments, divide, lastHandler$1);
}

defineValue(Math, {
  '$divide $chu': $divide,
  '$dividePlus $chuPlus': $dividePlus
});

function divide(num1, num2) {
  return num1 / num2;
}

function lastHandler$1(num, exponent, nums) {
  var dividend = getDividend(exponent, nums);

  return getDecimalLength(num) > 0 ? $multiply(num, dividend) : num * dividend;
}

function $mean() {

  return $toArray(arguments).reduce(function (count, next) {
    return count + next;
  }) / arguments.length;
}

defineValue(Math, '$mean', $mean);

function $minus(num1, num2) {
  return handler(num1, num2, minus);
}

function $minusPlus() {
  return handlerPlus(arguments, minus);
}

defineValue(Math, {
  '$minus $jian': $minus,
  '$minusPlus $jianPlus': $minusPlus
});

function minus(num1, num2) {
  return num1 - num2;
}

var random = Math.random;

var floor = Math.floor;

var abs = Math.abs;

function $random() {
  var cache = _randomParameters(arguments);

  return _random(cache[0], cache[1]);
}

function $randomPlus() {
  var cache = _randomParameters(arguments);
  var from = cache[0],
      to = cache[1];

  if (from > 0) {
    return _random(from, to);
  } else {
    cache = _random(0, to + abs(from));

    return cache > to ? to - cache : cache;
  }
}

defineValue(Math, {
  $random: $random,
  $randomPlus: $randomPlus
});

function _randomParameters(args) {
  var from = parametersDefault(args, 0, 9),
      to = parametersDefault(args, 1, 0);

  return from > to ? [to, from] : [from, to];
}

function _random(from, to) {
  return floor(random() * (to - from + 1) + from);
}

function $isNumber(obj) {
  if (isNumber(obj) || typeof obj === 'string') {
    if (!isNaN(obj - parseFloat(obj))) {
      return true;
    }
  }
  return false;
}

defineValue(Number, '$isNumber', $isNumber);

defineValue(Object, '$assign', $assign);

function $create$1(isNoProto) {
  var args = parametersRest(arguments, 1);

  if (isBoolean(isNoProto) || !isNoProto) {
    isNoProto = !!isNoProto;
  } else {
    args.unshift(isNoProto);
    isNoProto = false;
  }

  args.unshift(isNoProto ? create(null) : {});

  return $assign.apply(isNoProto, args);
}
defineValue(Object, '$create', $create$1);

defineValue(ObjectProto, '$delete $remove', function $delete() {
  var _this = this;

  $toArray(arguments).$each(function (key) {
    delete _this[key];
  });
  return this;
});

defineValue(ObjectProto, '$deleteValue $removeValue', function $deleteValue(value) {
  var isEqual = parametersDefault(arguments, 1, true) ? congruence : equals;
  var name;

  for (name in this) {
    if (isEqual(this[name], value)) {
      delete this[name];
    }
  }

  return this;
});

function $each(obj, callback) {

  if (obj == null) return obj;

  var key,
      value;

  for (key in obj) {
    value = obj[key];

    if (callback.call(value, key, value, obj) === false) {
      break;
    }
  }

  return obj;
}

defineValue(Object, '$each', $each);

defineValue(ObjectProto, '$get', function (key) {
  return this[key];
});

function $isEmptyObject(obj) {
  for (var a in obj) {
    return false;
  }
  return true;
}

defineValue(Object, '$isEmptyObject', $isEmptyObject);

defineValue(Object, '$isPlainObject', $isPlainObject);

/**
 * 在一个对象上定义/修改一个新属性的 get 描述符
 * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
 * @param {String} name 要定义或修改的属性的名称
 * @param {Function} get 将被定义或修改的 get 描述符
 * @param {any} options 将被定义或修改的属性描述符
 */
function defineGet(obj, name, get, options) {
  var key;

  if (isObject(name)) {
    for (key in name) {
      defineGet(obj, key, name[key], options);
    }
    return name;
  }

  return define(obj, name, { get: get }, options || defineGetPropertyOptions), get;
}

function $self() {
  return this;
}

defineValue(ObjectProto, '$self', $self);
defineGet(ObjectProto, '__self__', $self);

defineValue(ObjectProto, '$set $edit', function (key, value) {
  var _key;

  if (isObject(key)) for (_key in key) {
    this[_key] = key[_key];
  } else this[key] = value;

  return this;
});

var fromCharCode = String.fromCharCode;

function string$random() {
  var uppercase = parametersDefault(arguments, 0, false);

  return fromCharCode(uppercase ? $random(65, 90) : $random(97, 122));
}

defineValue(String, '$random', string$random);

/**
 * 判断传入对象是否是 RegExp 类型
 * @param {any} obj 需要判断的对象
 * @returns {Boolean}
 */
function isRegExp(obj) {
  return toString.call(obj) === '[object RegExp]';
}

var rkeyword = /([\.\*\+\?\|\(\)\[\]\{\}\^\$])/g;

var StringProto = String.prototype;

defineValue(StringProto, '$replaceAll', function (searchValue, replaceValue) {
  var flags = 'g';

  if (isRegExp(searchValue)) {
    if (searchValue.global) {
      return this.replace(searchValue, replaceValue);
    } else {
      flags += searchValue.flags || '';
      searchValue = searchValue.source;
    }
  } else {
    searchValue = searchValue.replace(rkeyword, '\\$1');
  }

  return this.replace(new RegExp(searchValue, flags), replaceValue);
});

function string$someRandom() {
  var result = '',
      length = parametersDefault(arguments, 0, 12);
  var hasUppercase = parametersDefault(arguments, 1, false),
      hasNumber = parametersDefault(arguments, 2, false);

  while (length-- > 0) {
    result += string$random();
  }

  if (hasUppercase) {
    result = result.split('').map(function (code) {
      return $random(1) ? code.toUpperCase() : code;
    }).join('');
  }

  if (hasNumber) {
    result = (result[0] || '') + result.slice(1).split('').map(function (code) {
      return $random(1) ? $random() : code;
    }).join('');
  }

  return result;
}

defineValue(String, '$someRandom', string$someRandom);

defineValue(StringProto, '$toCapitalize', function $toCapitalize() {
  return this.substr(0, 1).toUpperCase() + this.substr(1).toLowerCase();
});

/**
 * @type {Boolean} 当前是否是浏览器环境
 */
var inBrowser = typeof window !== 'undefined';

/**
 * @type {Boolean} 当前是否是 Node 环境
 */
var inNode = typeof global !== 'undefined';

var root = inBrowser ? window : inNode ? global : undefined;

var rBackSlant = /\+/g;

function toString$1(obj) {
  switch (typeof obj) {
    case 'string':
      return obj;
    case 'boolean':
      return obj ? 'true' : 'false'; // 使用 toString 性能慢三倍
    case 'number':
      return isFinite(obj) ? obj : '';
    default:
      return '';
  }
}

function stringify$1(obj) {
  var sep = parametersDefault(arguments, 1, '&'),
      eq = parametersDefault(arguments, 2, '=');

  if (isObject(obj)) {
    return Object.keys(obj).map(function (key) {
      return encodeURIComponent(toString$1(key)) + eq + encodeURIComponent(toString$1(obj[key]));
    }).join(sep);
  }

  return '';
}

function parse(str) {
  var sep = parametersDefault(arguments, 1, '&'),
      eq = parametersDefault(arguments, 2, '='),
      result = {};

  if (!isString(str)) {
    return result;
  }

  var i = 0,
      key,
      value,
      cache,
      index;

  var queryList = str.split(sep),
      queryLength = queryList.length;

  for (; i < queryLength; i++) {
    cache = queryList[i].replace(rBackSlant, '%20');
    index = cache.indexOf(eq);

    if (index > -1) {
      key = cache.substr(0, index);
      value = cache.substr(index + 1);
    } else {
      key = cache;
    }

    key = decodeURIComponent(key);
    value = decodeURIComponent(value);

    result[key] = value;
  }

  return result;
}

defineValue(root, '$querystring', {
  stringify: stringify$1,
  parse: parse
});

function $typeof(obj) {
  var type;

  if (obj == null) return obj + '';
  if ((type = typeof obj) === 'object') {
    if (isArray(obj)) return 'array';
  }
  return type;
}

defineValue(root, '$typeof', $typeof);

/**
 * ZenJS
 */
var ZenJS = $create$1(true, {
  version: '2.3.0'
});

if (inBrowser) {
  window.Zen = window.ZenJS = ZenJS;
}

var guid = 1;

defineProperty(ZenJS, 'guid', {
  get: function () {
    return guid++;
  }
});

/**
 * @returns {Boolean} true
 */
function returnTrue() {
  return true;
}

/**
 * @returns {Boolean} false
 */
function returnFalse() {
  return false;
}

ZenJS.util = $create$1(true, {

  isEquals: equals,
  isCongruence: congruence,

  isArray: isArray,
  isBoolean: isBoolean,
  isFunction: isFunction,
  isNumber: isNumber,
  isObject: isObject,
  isRegExp: isRegExp,
  isString: isString,

  parametersDefault: parametersDefault,
  parametersRest: parametersRest,

  define: define,
  defineGet: defineGet,
  defineValue: defineValue,
  returnTrue: returnTrue,
  returnFalse: returnFalse
});

module.exports = ZenJS;
