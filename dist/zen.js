/*!
 * Zen.js v5.0.0-beta.5
 * https://github.com/MoomFE/ZenJS
 * 
 * (c) 2018-present Wei Zhang
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ZenJS = factory());
}(this, (function () { 'use strict';

  var defineProperty = Object.defineProperty;

  var keys = Object.keys;

  /**
   * 方法返回一个给定对象自身可枚举属性的键值对数组.
   * Object.entries polyfill
   */

  function entries (obj) {
    var index, key;
    var ownKeys = keys(obj);
    var result = Array(index = ownKeys.length);

    while (index--) {
      result[index] = [key = ownKeys[index], obj[key]];
    }

    return result;
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

  /**
   * Transplant from jQuery
   * Version: 3.3.1
   * Homepage: https://jquery.com
   */

  var fnToString = hasOwnProperty.toString,
      ObjectFunctionString = fnToString.call(Object);
  /**
   * 判断传入对象是否是纯粹的对象
   * @param {any} obj 需要判断的对象
   */

  function isPlainObject(obj) {
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

  var isArray = Array.isArray;

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

        if (!shallow && ownValue && (isPlainObject(ownValue) || isArray(ownValue))) {
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

          if (isArray(ownValue)) {
            cloneValue = [];
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


    if (isArray(obj) && obj instanceof Array) {
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

  var ArrayProto = Array.prototype;

  /**
   * 判断传入对象是否是 String 类型
   * @param {any} obj 需要判断的对象
   * @returns {Boolean}
   */
  function isString(obj) {
    return typeof obj === 'string';
  }

  /**
   * 判断传入对象是否是 Number 类型, 并且不为 NaN
   * @param {any} obj 需要判断的对象
   * @returns {Boolean}
   */

  function isNumber(obj) {
    return typeof obj === 'number' && obj === obj;
  }
  /**
   * 判断传入对象是否是数字类型或可转为数字
   * @param {any} obj 需要判断的对象
   * @returns {Boolean}
   */

  function $isNumber(obj) {
    var num = obj;

    if ((isNumber(obj) || isString(obj) && !isNaN(obj - (num = parseFloat(obj)))) && isFinite(num)) {
      return true;
    }

    return false;
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

    if (!isInsert && isFunction(insert)) {
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

    if (isArray(array)) {
      return array.concat(source);
    }

    return slice.call(source);
  });

  defineValue(Array, '$create', create$1);

  function $each(array, callback) {
    if (!array || !array.length || !isFunction(callback)) {
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
  /**
   * 判断传入对象是否是一个类数组对象
   * @param value 需要判断的对象
   */

  function isArrayLike(value) {
    if (value == null || isFunction(value)) {
      return false;
    }

    if (isArray(value)) {
      return true;
    }

    var length = value.length;

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
    if (isFunction(predicate)) {
      return predicate;
    }

    return predicate ? congruence : equals;
  }
  function autoGetPredicate(args, value, predicateIndex, predicate) {
    if (args.length > 1) {
      predicate = getPredicate(parametersDefault(args, predicateIndex, true));
    } else if (isFunction(value)) {
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
    return isFunction(Map) && obj instanceof Map;
  }

  /**
   * 判断传入对象是否是 Set 对象
   * @param {any} obj 需要判断的对象
   * @returns {Boolean}
   */

  function isSet(obj) {
    return isFunction(Set) && obj instanceof Set;
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

  /**
   * 方法返回一个给定对象自身的所有可枚举属性值的数组.
   * Object.values polyfill
   */

  function values (obj) {
    return keys(obj).map(function (key) {
      return obj[key];
    });
  }

  /**
   * 判断传入对象是否是 Boolean 类型
   * @param {any} obj 需要判断的对象
   * @returns {Boolean}
   */
  function isBoolean(obj) {
    return typeof obj === 'boolean';
  }

  function $toArray(value, transKey) {
    // 不可转为数组的, 直接返回空数组
    if (!value || isBoolean(value)) {
      return [];
    } // 是字符串类型


    if (isString(value)) {
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
    } // 转换 JSON


    if (isPlainObject(value)) {
      return transKey ? keys(value) : values(value);
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

  function parametersRest(args, index) {
    return slice.call(args, index || 0);
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
      $add(_this2, increasedLength + index, isArray(arg) ? arg : [arg]); // 用于修正 index, 后续的 arg 需要插入到前面的 arg 后面

      increasedLength = _this2.length - originLength;
    });
    return this;
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

  /**
   * 方法返回对象的遍历方法
   * @param {*} obj 
   * @param {*} predicate 
   */

  function getTraversal(obj, predicate) {
    var objIsArray = isArray(obj);
    return function (object) {
      if (obj == null || isEmptyObject(object)) {
        return false;
      }

      return (objIsArray ? checkArray : checkObject)(obj, object, predicate);
    };
  }

  function checkArray(source, object, predicate) {
    var length = source.length;
    var index = 0,
        chunk,
        key; // 遍历检测对象

    for (; index < length; index++) {
      chunk = source[index];
      key = chunk[0];

      if (!(key in object && (chunk.length === 1 || predicate(chunk[1], object[key])))) {
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
   * @param {Array} self 进行遍历的数组
   * @param {Boolean} reverse 是否反向查询
   * @param {Number} count 保存的查找结果数量
   * @param {Boolean} not 返回 NOT 结果集 ( 非 )
   */

  function find(self, reverse, count, not,
  /**/
  obj, predicate, fromIndex
  /**/
  ) {
    /** 返回值 */
    var result = [];
    /** 当前数组长度 */

    var length; // 1. 传入的内容不可检索
    // 2. 数组为空
    // 3. 结果集过小

    if (obj == null || !(length = self.length) || count < 1) {
      return result;
    }
    /** 遍历方法 */


    var traversal; // 首个参数是方法或布尔值
    // $findIndex( Function, fromIndex? )

    if (isFunction(obj)) {
      traversal = obj;
      fromIndex = predicate;
    } // $findIndex( Array | Object )
    // $findIndex( Array | Object, fromIndex )
    // $findIndex( Array | Object, Function | Boolean )
    // $findIndex( Array | Object, Function | Boolean, fromIndex )
    else {
        // $findIndex( Array | Object, fromIndex )
        if (isNumber(predicate)) {
          fromIndex = predicate;
          predicate = congruence;
        } // $findIndex( Array | Object )
        // $findIndex( Array | Object, Boolean )
        // $findIndex( Array | Object, Boolean, fromIndex )
        else if (!isFunction(predicate)) {
            // $findIndex( Array | Object, Boolean )
            // $findIndex( Array | Object, Boolean, fromIndex )
            if (isBoolean(predicate)) {
              predicate = predicate ? congruence : equals;
            } // $findIndex( Array | Object )
            else {
                predicate = congruence;
              }
          }
      } // 指定值遍历时的检测方法


    if (!traversal) {
      if (isArrayLike(obj)) {
        obj = chunk(obj, 2);
      }

      traversal = getTraversal(obj, predicate);
    } // 矫正 fromIndex


    fromIndex = fromIndex || (reverse ? -1 : 0);
    /** 初始开始遍历的 index */

    var index = isNumber(fromIndex) ? fixArrayIndex(self, fromIndex) : reverse ? length - 1 : 0;
    /** 值, 缓存 */

    var value;
    /** 每次自增的值 */

    var add = reverse ? -1 : 1;

    for (; index >= 0 && index <= length - 1; index += add) {
      if ((!!traversal(value = self[index]) ? !not : not) && result.$push([index, value]).length >= count) {
        return result;
      }
    }

    return result;
  }
  each({
    $find: [false, 1],
    $findLast: [true, 1],
    $findAll: [false, Infinity],
    $findSome: [false],
    $findLastSome: [true]
  }, function (name, args) {
    /** 是否反向查询 */
    var reverse = args[0];
    /** 保存的查找结果数量 */

    var count = args[1];
    /** 是否是返回全部结果集 */

    var returnAll = name.indexOf('All') > -1 || !count; // Index, Not, Chunk

    ['', 'Index', 'Chunk'].forEach(function (suffix2, index) {
      /** 是否是返回 index */
      var returnIndex = index === 1 ? 0 : 1;
      /** 是否直接返回 chunk */

      var returnChunk = index === 2;
      ['', 'Not'].forEach(function (suffix, index) {
        /** 全名 */
        var fullname = name + suffix + suffix2;
        /** 是否是返回 NOT 结果集 */

        var not = !!index;
        defineValue(ArrayProto, fullname, function (obj, predicate, fromIndex) {
          var some;

          if (!count) {
            if (isNumber(obj)) {
              some = obj;
              obj = predicate;
              predicate = fromIndex;
              fromIndex = arguments[3];
            } else {
              some = Infinity;
            }
          } // 获取结果集


          var result = find(this, reverse, count || some, not, obj, predicate, fromIndex); // 返回全部结果集

          if (returnAll) {
            return returnChunk ? result : result.map(function (arr) {
              return arr[returnIndex];
            });
          } // 返回单个结果集


          if (result.length) {
            return returnChunk ? result[0] : result[0][returnIndex];
          } else {
            // 返回 chunk 时, 没找到结果也返回 undefined
            return returnIndex || returnChunk ? undefined : -1;
          }
        });
      });
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

  function set(array, index, value) {
    index = fixArrayIndex(array, index); // 占位, 如果位数超过数组长度, 使用 splice 不会创建多余空间
    // [ 1, 2, 3 ].$splice( 99, 1, 4 );
    // [ 1, 2, 3, 4 ]

    array[index] = undefined; // 使 Vue 能够刷新数据

    array.splice(index, 1, value);
  }

  function edit(array, index, value) {
    var length = array.length;

    if ((index = fixArrayIndex(array, index)) >= length) {
      index = length - 1;
    }

    array.splice(index, 1, value);
  }

  ['$set', '$edit'].forEach(function (name, index) {
    var fn = index ? edit : set;
    defineValue(ArrayProto, name, function (index, value) {
      var _this = this;

      if (isObject(index)) {
        entries(index).forEach(function (arr) {
          fn(_this, arr[0], arr[1]);
        });
      } else {
        fn(this, index, value);
      }

      return this;
    });
  });

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

  defineValue(Object, '$assign', function (shallow) {
    if (isBoolean(shallow)) {
      return assign(shallow, parametersRest(arguments, 1));
    }

    return assign(false, arguments);
  });
  defineValue(ObjectProto, '$assign', function (shallow) {
    if (isBoolean(shallow)) {
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
    'function': function (obj, obj2) {
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
   * 是 String.prototype.repeat 的降级方案
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

  /**
   * 返回传入的第一个参数
   * @param {any} arg 
   * @returns {any} arg
   */
  function returnArg(arg) {
    return arg;
  }

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
    }, returnArg);
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

  var StringProto = String.prototype;

  var rkeyword = /([\.\*\+\?\|\(\)\[\]\{\}\^\$\\])/g;

  /**
   * 判断传入对象是否是 RegExp 类型
   * @param {any} obj 需要判断的对象
   * @returns {Boolean}
   */

  function isRegExp(obj) {
    return toString.call(obj) === '[object RegExp]';
  }

  var RegExpProto = RegExp.prototype;

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

  var rflags = /[gimsuy]*$/;

  if (RegExpProto.flags === undefined) {
    defineGet(RegExpProto, 'flags', function () {
      return this.toString().match(rflags)[0];
    });
  }

  defineValue(StringProto, '$replaceAll', function (searchValue, replaceValue) {
    var flags = 'g';

    if (searchValue == null) {
      return this;
    }

    if (isString(searchValue)) {
      searchValue = searchValue.replace(rkeyword, '\\$1');
    } else if (isRegExp(searchValue)) {
      if (searchValue.global) {
        flags = searchValue.flags;
      } else {
        flags += searchValue.flags;
      }
      searchValue = searchValue.source;
    }

    return this.replace(new RegExp(searchValue, flags), replaceValue || '');
  });

  ['$toCapitalize', ''].forEach(function (name, index) {
    var fn = ['toUpperCase', 'toLowerCase'][index ? 'reverse' : '$self']();
    var toUpperCase = fn[0];
    var toLowerCase = fn[1];
    defineValue(StringProto, name + " $" + toUpperCase.replace('C', 'FirstC'), function (ignoreNext) {
      return this.substr(0, 1)[toUpperCase]() + this.substr(1)[ignoreNext ? '$self' : toLowerCase]();
    });
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
  var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
  var INVALID_DATE_STRING = 'Invalid Date'; // regex

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
    return Number(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
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
    } // eslint-disable-next-line no-nested-ternary


    var cfg = c ? typeof c === 'string' ? {
      format: c
    } : c : {};
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
      var $d = this.$d;
      this.$y = $d.getFullYear();
      this.$M = $d.getMonth();
      this.$D = $d.getDate();
      this.$W = $d.getDay();
      this.$H = $d.getHours();
      this.$m = $d.getMinutes();
      this.$s = $d.getSeconds();
      this.$ms = $d.getMilliseconds();
      this.$L = this.$L || parseLocale(cfg.locale, null, true) || L;
    } // eslint-disable-next-line class-methods-use-this
    ;

    _proto.$utils = function $utils() {
      return Utils;
    };

    _proto.isValid = function isValid() {
      return !(this.$d.toString() === INVALID_DATE_STRING);
    };

    _proto.isSame = function isSame(that, units) {
      var other = dayjs(that);
      return this.startOf(units) <= other && other <= this.endOf(units);
    };

    _proto.isAfter = function isAfter(that, units) {
      return dayjs(that) < this.startOf(units);
    };

    _proto.isBefore = function isBefore(that, units) {
      return this.endOf(units) < dayjs(that);
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
        _this.toDate(), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
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
      var _C$D$C$DATE$C$M$C$Y$C; // private set


      var unit = Utils.prettyUnit(units);
      var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = 'setDate', _C$D$C$DATE$C$M$C$Y$C[DATE] = 'setDate', _C$D$C$DATE$C$M$C$Y$C[M] = 'setMonth', _C$D$C$DATE$C$M$C$Y$C[Y] = 'setFullYear', _C$D$C$DATE$C$M$C$Y$C[H] = 'setHours', _C$D$C$DATE$C$M$C$Y$C[MIN] = 'setMinutes', _C$D$C$DATE$C$M$C$Y$C[S] = 'setSeconds', _C$D$C$DATE$C$M$C$Y$C[MS] = 'setMilliseconds', _C$D$C$DATE$C$M$C$Y$C)[unit];
      var arg = unit === D ? this.$D + (int - this.$W) : int;
      if (this.$d[name]) this.$d[name](arg);
      this.init();
      return this;
    };

    _proto.set = function set(string, int) {
      return this.clone().$set(string, int);
    };

    _proto.add = function add(number, units) {
      var _this2 = this,
          _C$MIN$C$H$C$S$unit;

      number = Number(number); // eslint-disable-line no-param-reassign

      var unit = Utils.prettyUnit(units);

      var instanceFactory = function instanceFactory(u, n) {
        var date = _this2.set(DATE, 1).set(u, n + number);

        return date.set(DATE, Math.min(_this2.$D, date.daysInMonth()));
      };

      var instanceFactorySet = function instanceFactorySet(n) {
        var date = new Date(_this2.$d);
        date.setDate(date.getDate() + n * number);
        return wrapper(date, _this2);
      };

      if (unit === M) {
        return instanceFactory(M, this.$M);
      }

      if (unit === Y) {
        return instanceFactory(Y, this.$y);
      }

      if (unit === D) {
        return instanceFactorySet(1);
      }

      if (unit === W) {
        return instanceFactorySet(7);
      }

      var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1; // ms

      var nextTimeStamp = this.valueOf() + number * step;
      return wrapper(nextTimeStamp, this);
    };

    _proto.subtract = function subtract(number, string) {
      return this.add(number * -1, string);
    };

    _proto.format = function format(formatStr) {
      var _this3 = this;

      if (!this.isValid()) return INVALID_DATE_STRING;
      var str = formatStr || FORMAT_DEFAULT;
      var zoneStr = Utils.padZoneStr(this.$d.getTimezoneOffset());
      var locale = this.$locale();
      var weekdays = locale.weekdays,
          months = locale.months;

      var getShort = function getShort(arr, index, full, length) {
        return arr && arr[index] || full[index].substr(0, length);
      };

      var get$H = function get$H(match) {
        if (_this3.$H === 0) return 12;
        return Utils.padStart(_this3.$H < 13 ? _this3.$H : _this3.$H - 12, match === 'hh' ? 2 : 1, '0');
      };

      return str.replace(REGEX_FORMAT, function (match) {
        if (match.indexOf('[') > -1) return match.replace(/\[|\]/g, '');
        return {
          YY: String(_this3.$y).slice(-2),
          YYYY: String(_this3.$y),
          M: String(_this3.$M + 1),
          MM: Utils.padStart(_this3.$M + 1, 2, '0'),
          MMM: getShort(locale.monthsShort, _this3.$M, months, 3),
          MMMM: months[_this3.$M],
          D: String(_this3.$D),
          DD: Utils.padStart(_this3.$D, 2, '0'),
          d: String(_this3.$W),
          dd: getShort(locale.weekdaysMin, _this3.$W, weekdays, 2),
          ddd: getShort(locale.weekdaysShort, _this3.$W, weekdays, 3),
          dddd: weekdays[_this3.$W],
          H: String(_this3.$H),
          HH: Utils.padStart(_this3.$H, 2, '0'),
          h: get$H(match),
          hh: get$H(match),
          a: _this3.$H < 12 ? 'am' : 'pm',
          A: _this3.$H < 12 ? 'AM' : 'PM',
          m: String(_this3.$m),
          mm: Utils.padStart(_this3.$m, 2, '0'),
          s: String(_this3.$s),
          ss: Utils.padStart(_this3.$s, 2, '0'),
          SSS: Utils.padStart(_this3.$ms, 3, '0'),
          Z: zoneStr
        }[match] || zoneStr.replace(':', ''); // 'ZZ'
      });
    };

    _proto.diff = function diff(input, units, float) {
      var _C$Y$C$M$C$Q$C$W$C$D$;

      var unit = Utils.prettyUnit(units);
      var that = dayjs(input);
      var diff = this - that;
      var result = Utils.monthDiff(this, that);
      result = (_C$Y$C$M$C$Q$C$W$C$D$ = {}, _C$Y$C$M$C$Q$C$W$C$D$[Y] = result / 12, _C$Y$C$M$C$Q$C$W$C$D$[M] = result, _C$Y$C$M$C$Q$C$W$C$D$[Q] = result / 3, _C$Y$C$M$C$Q$C$W$C$D$[W] = diff / MILLISECONDS_A_WEEK, _C$Y$C$M$C$Q$C$W$C$D$[D] = diff / MILLISECONDS_A_DAY, _C$Y$C$M$C$Q$C$W$C$D$[H] = diff / MILLISECONDS_A_HOUR, _C$Y$C$M$C$Q$C$W$C$D$[MIN] = diff / MILLISECONDS_A_MINUTE, _C$Y$C$M$C$Q$C$W$C$D$[S] = diff / MILLISECONDS_A_SECOND, _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff; // milliseconds

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
      return this.$d.toISOString();
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

  dayjs.prototype = Dayjs.prototype;

  dayjs.extend = function (plugin, option) {
    plugin(option, Dayjs, dayjs);
    return dayjs;
  };

  dayjs.locale = parseLocale;
  dayjs.isDayjs = isDayjs;

  dayjs.unix = function (timestamp) {
    return dayjs(timestamp * 1e3);
  };

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

  defineValue(Date, '$format', function (date, formatStr) {
    return dayjs(date).format(formatStr);
  });

  /**
   * @type {Boolean} 当前是否是 Node 环境
   */
  var inNode = typeof global !== 'undefined';

  var root = inBrowser ? window : inNode ? global : {};

  defineValue(root, 'dayjs', dayjs);

  var index = function (o, c, d) {
    c.prototype.isBetween = function (a, b, u) {
      var dA = d(a);
      var dB = d(b);
      return this.isAfter(dA, u) && this.isBefore(dB, u) || this.isBefore(dA, u) && this.isAfter(dB, u);
    };
  };

  var index$1 = function (o, c) {
    c.prototype.isSameOrBefore = function (that, units) {
      return this.isSame(that, units) || this.isBefore(that, units);
    };
  };

  var index$2 = function (o, c) {
    c.prototype.isSameOrAfter = function (that, units) {
      return this.isSame(that, units) || this.isAfter(that, units);
    };
  };

  var index$3 = function (o, c) {
    var proto = c.prototype;

    proto.isLeapYear = function () {
      return this.$y % 4 === 0 && this.$y % 100 !== 0 || this.$y % 400 === 0;
    };
  };

  [index, index$1, index$2, index$3].forEach(dayjs.extend);
  var ignore = 'clone_init_parse_toDate_toISOString_toJSON_toString_locale'.split('_');
  var isDayjs$1 = dayjs.isDayjs;
  dayjs.extend(function (option, Dayjs) {
    entries(Dayjs.prototype).forEach(function (obj) {
      obj[0].indexOf('$') === 0 || ignore.indexOf(obj[0]) > -1 || install(obj[0], obj[1]);
    });
  });

  function install(name, fn) {
    defineValue(DateProto, '$' + name, function () {
      var result = fn.apply(this.$dayjs(), arguments);

      if (isDayjs$1(result)) {
        this.setTime(result.valueOf());
        this[DAYJS] = result;
        return this;
      }

      return result;
    });
    ['isValid', 'format'].$inArray(name) || defineValue(Date, '$' + name, function () {
      var result = fn.apply(dayjs(), arguments);
      return isDayjs$1(result) ? result.$d.$set(DAYJS, result) : result;
    });
  }

  var FunctionProto = Function.prototype;

  defineValue(FunctionProto, '$after', function () {
    var func = this;
    var num = parametersDefault(arguments, 0, 1);
    return function () {
      num-- < 1 && func.apply(this, arguments);
    };
  });

  defineValue(FunctionProto, '$args', function (oArgs) {
    var func = this;
    return function () {
      var args = [];
      var currentArgs = arguments;
      var oArgsKeys = keys(oArgs);
      var length = oArgsKeys.length + currentArgs.length;
      var currentIndex = 0;
      var index = 0;

      for (; index < length; index++) {
        args[index] = index in oArgs ? oArgs[index] : currentArgs[currentIndex++];
      }

      oArgsKeys.forEach(function (index) {
        index in args || args.$set(index, oArgs[index]);
      });
      return func.apply(this, args);
    };
  });

  defineValue(FunctionProto, '$one $once', function () {
    var func = this;
    var num = parametersDefault(arguments, 0, 1);
    var index = 1;
    return function () {
      index++ === num && func.apply(this, arguments);
    };
  });

  defineValue(RegExp, '$parse', function (keyword, flags) {
    return new RegExp(keyword.replace(rkeyword, '\\$1'), flags);
  });

  defineValue(root, '$typeof', function (obj) {
    if (obj == null) return obj + '';
    return isArray(obj) ? 'array' : typeof obj;
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
    var result = {};

    if (!str || !isString(str)) {
      return result;
    }

    var args = arguments;
    var sep = parametersDefault(args, 1, '&');
    var eq = parametersDefault(args, 2, '=');
    str.split(sep).forEach(function (_value) {
      var cache = _value.replace(rBackSlant, '%20');

      var index = cache.indexOf(eq);
      var key,
          value = '';

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
   * 传入一个键值对的列表, 并返回一个带有这些键值对的新对象 ( 是 Object.entries 的反转 )
   * Object.fromEntries polyfill
   */

  function fromEntries (iterable) {
    var result = {};
    var newIterable = $toArray(iterable);
    var item;
    var index = newIterable.length;

    while (index--) {
      item = newIterable[index];

      if (item && item.length) {
        result[item[0]] = item[1];
      }
    }

    return result;
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

  /**
   * 一个空方法
   */
  function noop() {}

  var ZenJS = root.ZenJS = assign(false, [null, {
    assign: assign$1,
    repeat: repeat,
    keys: keys,
    values: values,
    entries: entries,
    fromEntries: fromEntries,
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
  }]);

  var guid = 1;
  defineProperty(ZenJS, 'guid', {
    get: function () {
      return guid++;
    }
  });

  return ZenJS;

})));
