/*!
 * Zen.js v3.0.0
 * https://github.com/MoomFE/ZenJS
 * 
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

  /**
   * Transplant from jQuery
   * Version: 3.3.1
   * Homepage: https://jquery.com
   */

  function extend() {

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
          if (!shallow && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {

            // 目标对象的当前属性是否和该属性类型相同
            // 不是的话, 则进行覆盖
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : this === true ? create(null) : {};
            }

            target[name] = extend(clone, copy);
          } else if (copy !== undefined) {

            // 该属性不是原生对象和数组, 直接进行赋值
            target[name] = copy;
          }
        }
      }
    }

    return target;
  }

  var ArrayProto = Array.prototype;

  var slice = ArrayProto.slice;

  var assign = Object.assign || function () {
    extend.apply(null, [true].concat(slice.call(arguments)));
  };

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
      defineProperty(obj, name, assign({}, options, options2));
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
    var key;

    if (isObject(name)) {
      for (key in name) {
        defineValue(obj, key, name[key], options);
      }
      return name;
    }

    return define(obj, name, { value: value }, options || definePropertyOptions), value;
  }

  function $create(length, insert, isInsert) {
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

  defineValue(ArrayProto, '$chunk', function (size) {
    return $chunk(this, size);
  });

  defineValue(Array, '$copy', function (source, array) {
    return array ? array.concat(source) : source.slice();
  });

  function $each(array, callback) {
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

  /**
   * 判断传入对象是否是 Number 类型
   * @param {any} obj 需要判断的对象
   * @returns {Boolean}
   */
  function isNumber(obj) {
    return typeof obj === 'number';
  }

  var StringProto = String.prototype;

  var NumberProto = Number.prototype;

  var BooleanProto = Boolean.prototype;

  var FunctionProto = Function.prototype;

  [['String', StringProto], ['Number', NumberProto], ['Boolean', BooleanProto], ['Array', ArrayProto], ['Function', FunctionProto]].forEach(function (obj) {
    defineProperty(obj[1], "__is" + obj[0] + "__", {
      value: true,
      configurable: false, // 删除/定义
      enumerable: false, // 枚举
      writable: false // 写入
    });
  });

  var isString = '__isString__';
  var isBoolean$1 = '__isBoolean__';
  var isArray$1 = '__isArray__';
  var isFunction$1 = '__isFunction__';

  var MAX_SAFE_INTEGER = 9007199254740991;

  function $isArrayLike(obj) {

    if (obj == null || obj[isFunction$1]) {
      return false;
    }

    if (obj[isArray$1]) {
      return true;
    }

    var length = obj.length;

    if (isNumber(length) && length > -1 && length % 1 === 0 && length <= MAX_SAFE_INTEGER) {
      return true;
    }

    return false;
  }

  defineValue(Array, '$isArrayLike', $isArrayLike);

  var reHasUnicode = /[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/;

  var reUnicode = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g;

  function $toArray(value) {

    // 不可转为数组的, 直接返回空数组
    if (!value || value[isBoolean$1]) {
      return [];
    }

    // 是数组类型, 那就直接返回一个副本
    if (value[isArray$1]) {
      return slice.call(value);
    }

    // 是字符串类型
    if (value[isString]) {
      if (reHasUnicode.test(value)) {
        return value.match(reUnicode) || [];
      } else {
        return value.split('');
      }
    }

    // 其他类数组的类型, 比如 arguments, jQuery
    return slice.call(value);
  }

  defineValue(Array, '$toArray', $toArray);

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
    var i = 0;

    index = fixArrayIndex(self, index, 1);

    for (; i < len; i++) {
      self.splice(index++, 0, args[i]);
    }

    return self;
  }

  defineValue(ArrayProto, '$add', function (index) {
    return $add(this, index, parametersRest(arguments, 1));
  });

  defineValue(ArrayProto, '$delete $remove', function (index, noop, returnDeleted) {
    var num = parametersDefault(arguments, 1, 1);
    var deleted = this.splice(index, num);

    return returnDeleted ? deleted : this;
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
      $add(_this2, increasedLength + index, isArray(arg) ? arg : [arg]);
      // 用于修正 index, 后续的 arg 需要插入到前面的 arg 后面
      increasedLength = _this2.length - originLength;
    });

    return this;
  });

  // import './Math/index';
  // import './Number/index';
  // import './Object/index';
  // import './String/index';

})));
