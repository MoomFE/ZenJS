/*!
 * Zen.js v1.0.0-alpha.0
 * (c) 2018 Zhang_Wei
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  var isArray = Array.isArray;

  var defineProperty = Object.defineProperty;

  var definePropertyOptions = {
    configurable: true, // 删除/定义
    enumerable: false, // 枚举
    writable: true // 写入
  };

  function define(obj, name, options, options2) {
    if (isArray(obj) && obj instanceof Array) {
      obj.forEach(function (obj) {
        define(obj, name, options, options2);
      });
      return;
    }
    defineProperty(obj, name, Object.assign({}, definePropertyOptions, options, options2));
  }

  /**
   * 定义对象属性, 快捷定义 value 选项
   * @param {Object} obj 需要添加属性的元素
   * @param {String} name 属性名
   * @param {Function} value 添加到 value 选项的方法
   * @param {Object} options 属性选项
   */
  function defineValue(obj, name, value, options) {
    define(obj, name, { value: value }, options);
  }

  var ArrayProto = Array.prototype;

  /**
   * 获取方法指定位参数, 若未传入参数, 则取默认值
   * @param {Object} args arguments
   * @param {Number} index
   * @param {Object} defaultValue
   */
  function parametersDefault(args, index, defaultValue) {
    var arg;

    if (args.length > index && (arg = args[index]) !== undefined) {
      return arg;
    }
    return defaultValue;
  }

  function $get() {
    var index = parametersDefault(arguments, 0, 0),
        num = arguments[1];

    if (num == null) {
      return this[index];
    }
    return this.slice(index, num);
  }

  defineValue(ArrayProto, '$get', $get);

  function parametersRest(args, index) {
    var length = args.length;

    if (length > index) {
      return Array.from(args).$get(index, length);
    }
    return [];
  }

  function $add(index) {
    var i = 0;
    var args = parametersRest(arguments, 1),
        len = args.length;

    for (; i < len; i++) {
      this.splice(index++, 0, args[i]);
    }

    return this;
  }

  defineValue(ArrayProto, '$add', $add);

  /**
   * 判断传入对象是否是方法
   * @param {Object} obj 需要判断的对象
   */
  function isFunction(obj) {
    return typeof obj === 'function';
  }

  function $create(length, insert) {
    var i = 0,
        result = [];

    length >>= 0;

    for (; i < length; i++) {
      result.push(insert && isFunction(insert) ? insert(i) : insert);
    }return result;
  }

  defineValue(Array, '$create', $create);

  function $delete(index) {
    var num = parametersDefault(arguments, 1, 1);

    return this.splice(index, num), this;
  }

  defineValue(ArrayProto, '$delete', $delete);

  function _equal(one, two) {
    return one == two;
  }
  function _congruence(one, two) {
    return one === two;
  }

  function $deleteValue(value) {
    var congruence = parametersDefault(arguments, 1, true),
        isEqual = congruence ? _congruence : _equal;
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
  }

  defineValue(ArrayProto, '$deleteValue', $deleteValue);

  function $each(callback) {
    var index = 0,
        length = this.length,
        value;

    for (; index < length; index++) {
      value = this[index];

      if (callback.call(value, index, value, this) === false) {
        break;
      }
    }

    return this;
  }

  defineValue(ArrayProto, '$each', $each);

  function $inArray(obj) {
    var i = 0,
        len = this.length;

    for (; i < len; i++) {
      if (this[i] == obj) return true;
    }return false;
  }

  defineValue(ArrayProto, '$inArray', $inArray);

  /**
   * 判断传入对象是否是对象
   * @param {Object} obj 需要判断的对象
   */
  function isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }

  function $set(index, value) {
    var _index;

    if (isObject(index)) for (_index in index) {
      this[_index] = index[_index];
    } else this[index] = value;

    return this;
  }

  defineValue(ArrayProto, '$set', $set);

  'push_unshift_pop_shift'.split('_').forEach(function (key) {

    defineValue(ArrayProto, "$" + key, function () {
      return this[key].apply(this, arguments), this;
    });
  });

  function $ready(func, data) {
    if (this.readyState === 'complete' || this.readyState !== 'loading' && !this.documentElement.doScroll) return func.apply(window, data);
    this.addEventListener('DOMContentLoaded', function callback(event) {
      this.removeEventListener(event.type, callback);
      func.apply(window, data);
    });
  }

  defineValue(document, '$ready', $ready);

  var floor = Math.floor;

  var random = Math.random;

  function $random() {
    var from = parametersDefault(arguments, 0, 9),
        to = arguments[1];

    to || (to = from, from = 0);
    return floor(random() * (to - from + 1) + from);
  }

  defineValue(Math, '$random', $random);

  var ObjectProto = Object.prototype;

  var toString = ObjectProto.toString;

  var getPrototypeOf = Object.getPrototypeOf;

  var hasOwnProperty = Object.hasOwnProperty;

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

  defineValue(Object, '$isPlainObject', $isPlainObject);

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
        clone;

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
          if (copy && ($isPlainObject(copy) || (copyIsArray = isArray(copy)))) {

            // 目标对象的当前属性是否和该属性类型相同
            // 不是的话, 则进行覆盖
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && $isPlainObject(src) ? src : {};
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
  defineValue(Object, '$assign', $assign);

  var create = Object.create;

  /**
   * 判断传入对象是否是逻辑值
   * @param {Object} obj 需要判断的对象
   */
  function isBoolean(obj) {
    return typeof obj === 'boolean';
  }

  function $create$1(isNoProto) {
    var args = parametersRest(arguments, 1);

    if (isBoolean(isNoProto) || !isNoProto) {
      args.unshift(isNoProto ? create(null) : {});
    } else {
      args.unshift({}, isNoProto);
    }

    return $assign.apply(null, args);
  }
  defineValue(Object, '$create', $create$1);

  function $each$1(obj, callback) {
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

  defineValue(Object, '$each', $each$1);

  function $isEmptyObject(obj) {
    for (var a in obj) {
      return false;
    }
    return true;
  }

  defineValue(Object, '$isEmptyObject', $isEmptyObject);

  var fromCharCode = String.fromCharCode;

  function string$random() {
    var uppercase = parametersDefault(arguments, 0, false);

    return fromCharCode(uppercase ? $random(65, 90) : $random(97, 122));
  }

  defineValue(String, '$random', string$random);

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
      }).join();
    }

    if (hasNumber) {
      result = result.split('').map(function (code) {
        return $random(1) ? random() : code;
      })
      // 第一位不允许为数字
      .$set(0, string$random($random(1))).join();
    }

    return result;
  }

  defineValue(String, '$someRandom', string$someRandom);

  var StringProto = String.prototype;

  function $toCapitalize() {
    return this.substr(0, 1).toUpperCase() + this.substr(1).toLowerCase();
  }

  defineValue(StringProto, '$toCapitalize', $toCapitalize);

  function $ready$1(func, data) {
    if (this.document.readyState === 'complete') return func.apply(this, data);
    this.addEventListener('load', function callback(event) {
      this.removeEventListener(event.type, callback);
      func.apply(this, data);
    });
  }

  defineValue(window, '$ready', $ready$1);

  function $typeof(obj) {
    var type;

    if (obj == null) return obj + '';
    if ((type = typeof obj) === 'object') {
      if (isArray(obj)) return 'array';
    }
    return type;
  }

  defineValue(window, '$typeof', $typeof);

  /**
   * ZenJS
   */
  var Zen = window.Zen = $create$1(true, {
    version: '1.0.0-alpha.0'
  });

})));
