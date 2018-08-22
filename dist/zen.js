/*!
 * Zen.js v3.0.0
 * https://github.com/MoomFE/ZenJS
 * 
 * (c) 2018 Wei Zhang
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  var defineProperty = Object.defineProperty;

  var StringProto = String.prototype;

  var BooleanProto = Boolean.prototype;

  var ArrayProto = Array.prototype;

  var FunctionProto = Function.prototype;

  [['String', StringProto], ['Boolean', BooleanProto], ['Array', ArrayProto], ['Function', FunctionProto]].forEach(function (obj) {
    defineProperty(obj[1], "__is" + obj[0] + "__", {
      value: true,
      configurable: false, // 删除/定义
      enumerable: false, // 枚举
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

    var index,
        key;

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

  /**
   * 将多个源对象的可枚举属性合并到第一个对象中
   * @param {Boolean} shallow 是否使用浅拷贝模式, 类似于使用 Object.assign
   */
  function assign(shallow, args, parent) {

    var length = args.length;

    /** 首个源对象下标 */
    var index = 1;
    /** 目标对象 */
    var target = args[0] || {};

    /** 当前源对象 */
    var options;
    /** 当前源对象所有可枚举属性名及属性 */
    var ownEntries;
    var ownLength,
        ownIndex,
        ownEntrie,
        ownEntrieName;
    var ownValue,
        targetValue,
        cloneValue;

    // 遍历参数
    for (; index < length; index++) {

      // 无用参数
      if ((options = args[index]) == null) continue;

      // 所有可枚举属性
      // [ [ key, value ], [ key, value ], [ key, value ] ]
      ownEntries = entries(options);
      ownLength = ownEntries.length;
      ownIndex = 0;

      for (; ownIndex < ownLength; ownIndex++) {
        // [ key, value ]
        ownEntrie = ownEntries[ownIndex];
        ownEntrieName = ownEntrie[0];
        ownValue = ownEntrie[1];

        // 非浅拷贝模式下, 当前值是原生对象或数组, 则进行深拷贝
        if (!shallow && ownValue && (isPlainObject(ownValue) || ownValue[isArray])) {

          // 防御下面这种无限引用
          // var target = {};
          // var source = { infiniteLoop: target };
          // 
          // Object.$assign( target, source );
          if (ownValue === target) continue;
          // 防御下面这种无限引用
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
            cloneValue = targetValue && isPlainObject(targetValue) ? targetValue : {};
          }

          if (assign(false, [cloneValue, ownValue], options) !== undefined) {
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
    }

    name.split(' ').forEach(function (name) {
      defineProperty(obj, name, assign$1({}, options, options2));
    });
  }

  var definePropertyOptions = {
    configurable: true, // 删除/定义
    enumerable: false, // 枚举
    writable: true // 写入
  };

  /**
   * 在一个对象上定义/修改一个新属性的 value 描述符
   * @param {any} obj 要在其上定义属性的对象, 为数组时将对数组内对象都进行属性定义
   * @param {String} name 要定义或修改的属性的名称
   * @param {Function} value 将被定义或修改的 value 描述符
   * @param {any} options 将被定义或修改的属性描述符
   */
  function defineValue(obj, name, value, options) {
    define(obj, name, { value: value }, options || definePropertyOptions);

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
   * 判断传入对象是否是 Number 类型
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
  function create(length, insert, isInsert) {

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

    return create(ceil(length / size), function (index) {
      var start = index * size;
      return array.slice(start, start + size);
    });
  }

  defineValue(Array, '$chunk', chunk);

  defineValue(ArrayProto, '$chunk', function (size) {
    return chunk(this, size);
  });

  var isArray$1 = Array.isArray;

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

  defineValue(Array, '$create', create);

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
   * 判断传入的两个参数是否相等
   * @param {any} one 需要判断的第一参数
   * @param {any} two 需要判断的第二参数
   * @returns {Boolean}
   */
  function equals(one, two) {
    return one == two;
  }

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
   * 判断传入对象是否是 Map 类型
   * @param {any} obj 需要判断的对象
   * @returns {Boolean}
   */
  function isMap(obj) {
    return isFunction$1(Map) && obj instanceof Map;
  }

  /**
   * 判断传入对象是否是 Set 类型
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
    }

    // 是字符串类型
    if (value[isString]) {
      if (reHasUnicode.test(value)) {
        return value.match(reUnicode) || [];
      } else {
        return value.split('');
      }
    }

    // 是数组类型, 那就直接返回一个副本
    if (isArrayLike(value)) {
      return slice.call(value);
    }

    // 转换 Map, Set 类型
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
      $add(_this2, increasedLength + index, isArray$1(arg) ? arg : [arg]);
      // 用于修正 index, 后续的 arg 需要插入到前面的 arg 后面
      increasedLength = _this2.length - originLength;
    });

    return this;
  });

  defineValue(ArrayProto, '$findIndex', function (predicate, key) {
    return findIndex(this, predicate, key, arguments);
  });

  function findIndex(self, predicate, key, args) {

    var length;

    // 传入的内容不可检索或者数组为空
    if (predicate == null || !(length = self.length)) {
      return -1;
    }

    var traversal,
        predicateIsFunction = predicate[isFunction];

    if (predicateIsFunction || predicate[isBoolean]) {

      // $findIndex( Function )
      // 传入的方法是用作数组遍历时的手动进行检测
      if (predicateIsFunction && args.length === 1) {
        traversal = predicate;
      }
      // $findIndex( Function | Boolean, key, value )
      // $findIndex( Function | Boolean, Array )
      // $findIndex( Function | Boolean, Object )
      // 传入的方法是用作值比对时进行检测
      else {
          // 正常参数校正 index 为从 1 的地方开始
          args = parametersRest(args, 1);
          // 指定值比对时的方法
          if (!predicateIsFunction) {
            predicate = predicate ? congruence : equals;
          }
        }
    } else {
      // 首个参数不是对比的方法, 那么校正 key 的位置
      key = args[0];
      // 默认使用全等的比较方法
      predicate = congruence;
    }

    // 指定值遍历时的检测方法
    if (!traversal) {

      // 第一个参数不是数组或对象, 将所有传入参数转为数组
      // $findIndex( 'key', 'value', 'key2', 'value2' ) -> [ 'key', 'value', 'key2', 'value2' ]
      if (typeof key !== 'object') {
        key = slice.call(args);
      }

      // 将类数组类型的按照键值对进行分割
      // $findIndex( [ 'key', 'value', 'key2', 'value2' ] ) -> [ [ 'key', 'value' ], [ 'key2', 'value2' ] ]
      if (isArrayLike(key)) {
        key = chunk(key, 2);
      }

      traversal = getTraversal(key, predicate);
    }

    var index = 0;

    // 遍历数组内的对象, 交给检测方法进行检测
    for (; index < length; index++) {
      if (traversal(self[index])) {
        return index;
      }
    }

    return -1;
  }

  function getTraversal(key, predicate) {
    var keyIsArray = key[isArray];

    return function (object) {
      if (object == null || !keys(object).length) {
        return false;
      }
      return (keyIsArray ? checkArray : checkObject)(key, object, predicate);
    };
  }

  function checkArray(source, object, predicate) {
    var length = source.length;
    var index = 0,
        chunk$$1,
        key;

    // 遍历检测对象
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
        key;

    // 遍历检测对象
    for (; index < sLength; index++) {
      key = sKeys[index];

      if (!(key in object && predicate(source[key], object[key]))) {
        return false;
      }
    }

    return true;
  }

  defineValue(ArrayProto, '$find', function (predicate, key) {
    var index = findIndex(this, predicate, key, arguments);

    return index === -1 ? null : this[index];
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

  ['push', 'pop', 'unshift', 'shift'].forEach(function (key) {
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
   * @param {*} obj 需要判断的对象
   */
  function isReferenceType(obj) {
    var type = typeof obj;
    return type === 'object' || type === 'function';
  }

  function equals$2(obj, obj2, parent, parent2) {

    if (obj === obj2) {
      return true;
    }

    // 其中一个是假值 ( undefined, null, false, '', 0, NaN )
    if (!obj || !obj2) {
      // 对付 NaN 用的, 要不然直接就返回 false 了
      return obj !== obj && obj2 !== obj2;
    }

    var oString = toString.call(obj);

    // 实际类型不一样 ( RegExp, Element, ... )
    // 比如上面两种类型都是 object, 但是实际上却是不一样的
    // 过了这一步骤, 类型比对时就只需要比对一个值, 因为类型是完全相同的
    if (oString !== toString.call(obj2)) {
      return false;
    }

    // 非引用类型 ( String, Boolean, Number )
    if (!isReferenceType(obj)) {
      return false;
    }

    // 对于 object 更加细致点的比对 ( Map, Set, ... )
    // 它们两都是 [object Object]
    if (obj.constructor !== obj2.constructor) {
      return false;
    }

    // 是数组类型或类数组类型 ( Array, LikeArray )
    if (isArrayLike(obj)) {
      return types.array(obj, obj2, parent, parent2);
    }

    // 原始对象类型 ( JSON )
    if (isPlainObject(obj)) {
      return types.object(obj, obj2, parent, parent2);
    }

    var oType = oString.match(rType)[1].toLowerCase();

    // 有针对性的比对方法 ( Regexp, Date, Function )
    if (oType in types) {
      return types[oType](obj, obj2, parent, parent2);
    }

    // ( Elemnet )
    if (DomElement && obj instanceof DomElement) {
      return types.element(obj, obj2);
    }

    // ( Map, Set )
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
      var i,
          key;

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
      return obj.innerHTML === obj2.innerHTML;
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
    }

    // 进行下一步判断
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

  // import './$create/index';
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
      return this.$each(function (key, value) {
        _this[key] = value;
      });
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

})));
