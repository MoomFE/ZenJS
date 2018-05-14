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
    if (isArray(obj)) {
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

  /**
   * 页面完全加载完毕后执行传入代码
   * -- -- 方法可以用 Function[ call / apply ] 的方式使用, 可传入其他 window, 比如 iframe 的 window
   * @param {Function} func 需要执行的方法
   * @param {Object} data 需要传入方法的数据
   */
  function $ready(func, data) {
    if (this.document.readyState === 'complete') return func.apply(this, data);
    this.addEventListener('load', function callback(event) {
      this.removeEventListener(event.type, callback);
      func.apply(this, data);
    });
  }

  defineValue(window, '$ready', $ready);

  /**
   * 判断传入参数的类型
   * @param {Object} obj 需要判断类型的参数
   * @returns {String}
   */
  function $typeof(obj) {
    var type = void 0;

    if (obj == null) return obj + '';
    if ((type = typeof obj) === 'object') {
      if (isArray(obj)) return 'array';
    }
    return type;
  }

  defineValue(window, '$typeof', $typeof);

  /**
   * 页面加载完毕后执行传入代码
   * -- 方法可以用 Function[ call / apply ] 的方式使用, 可传入其他 document, 比如 iframe 的 document
   * 
   * @param {Function} func 需要执行的方法
   * @param {Object} data 需要传入方法的数据
   */
  function $ready$1(func, data) {
    if (this.readyState === 'complete' || this.readyState !== 'loading' && !this.documentElement.doScroll) return func.apply(window, data);
    this.addEventListener('DOMContentLoaded', function callback(event) {
      this.removeEventListener(event.type, callback);
      func.apply(window, data);
    });
  }

  defineValue(document, '$ready', $ready$1);

  var ObjectProto = Object.prototype;

  var toString = ObjectProto.toString;

  var getPrototypeOf = Object.getPrototypeOf;

  var hasOwnProperty = Object.hasOwnProperty;

  /**
   * 判断传入对象是否是方法
   * @param {Object} obj 需要判断的对象
   */
  function isFunction(obj) {
    return typeof obj === 'function';
  }

  var fnToString = hasOwnProperty.toString;

  var ObjectFunctionString = fnToString.call(Object);

  /**
   * 判断传入对象是否是纯粹的对象
   * @param {Object} obj 需要判断的对象
   * @returns {Boolean}
   */
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

  /**
   * Object.assign 的深拷贝版本
   * -- 改写自 jQuery
   * 
   * @returns {Object}
   */
  function $assign() {

    var i = 1,
        length = arguments.length,

    /** 目标对象 */
    target = arguments[0] || {},
        options = void 0,
        name = void 0,
        src = void 0,
        copy = void 0,
        copyIsArray = void 0,
        clone = void 0;

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

  /**
   * 创建一个全新的对象
   * 可传入多个参数, 会对参数进行继承
   * @param {Boolean} isNoProto 是否创建一个无 prototype 的对象
   * @returns {Object}
   */
  function $create(isNoProto) {
    for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arg[_key - 1] = arguments[_key];
    }

    var options = [].concat(arg);

    if (isBoolean(isNoProto) || !isNoProto) {
      options.unshift(isNoProto ? create(null) : {});
    } else {
      options.unshift({}, isNoProto);
    }

    return $assign.apply(null, options);
  }
  defineValue(Object, '$create', $create);

  /**
   * 判断传入对象是否是空对象
   * @param {Object} obj 需要判断的对象
   * @returns {Boolean}
   */
  function $isEmptyObject(obj) {
    for (var a in obj) {
      return false;
    }
    return true;
  }

  defineValue(Object, '$isEmptyObject', $isEmptyObject);

  var StringProto = String.prototype;

  /**
   * 将字符串首字母大写
   * 
   * @returns {String}
   */
  function $toCapitalize() {
    return this.substr(0, 1).toUpperCase() + this.substr(1).toLowerCase();
  }

  defineValue(StringProto, '$toCapitalize', $toCapitalize);

  /**
   * 快捷创建数组
   * @param {Number} length 需要创建的数组的长度
   * @param {Object} insert 需要填充到数组中的内容, 若传入方法, 将会向方法内传入当前 index
   * @returns {Array}
   */
  function $create$1(length, insert) {
    var i = 0,
        result = [];

    length >>= 0;

    for (; i < length; i++) {
      result.push(insert && isFunction(insert) ? insert(i) : insert);
    }return result;
  }

  defineValue(Array, '$create', $create$1);

  /**
   * ZenJS
   */
  var Zen = window.Zen = $create(true, {
    version: '1.0.0-alpha.0'
  });

  // import './Element/index';

})));
