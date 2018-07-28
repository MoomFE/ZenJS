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

  /**
   * 判断传入对象是否是 Number 类型
   * @param {any} obj 需要判断的对象
   * @returns {Boolean}
   */
  function isNumber(obj) {
    return typeof obj === 'number';
  }

  function $create(length, insert, isInsert) {

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

    if (!source || !source.length) {
      return [];
    }

    if (isArray(array)) {
      return array.concat(source);
    }

    return slice.call(source);
  });

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

  /**
   * 判断传入对象是否是 Map 类型
   * @param {any} obj 需要判断的对象
   * @returns {Boolean}
   */
  function isMap(obj) {
    return isFunction(Map) && obj instanceof Map;
  }

  /**
   * 判断传入对象是否是 Set 类型
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

  function $toArray(value) {

    // 不可转为数组的, 直接返回空数组
    if (!value || value[isBoolean$1]) {
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
    if ($isArrayLike(value)) {
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

  defineValue(ArrayProto, '$equals', function (obj) {

    if (!obj || obj[isFunction$1]) {
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

  var keys = Object.keys;

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
        predicateIsFunction = predicate[isFunction$1];

    if (predicateIsFunction || predicate[isBoolean$1]) {

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
      if ($isArrayLike(key)) {
        key = $chunk(key, 2);
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
    var keyIsArray = key[isArray$1];

    return function (object) {
      if (object == null || !keys(object).length) {
        return false;
      }
      return (keyIsArray ? checkArray : checkObject)(key, object, predicate);
    };
  }

  function checkArray(source, object, predicate) {
    var index = 0,
        chunk,
        key;
    var length = source.length;

    // 遍历检测对象
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
    var key;

    for (key in source) {
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

  function equals$1(obj, obj2) {

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
    if ($isArrayLike(obj)) {
      return types.array(obj, obj2);
    }

    // 原始对象类型 ( JSON )
    if (isPlainObject(obj)) {
      return types.object(obj, obj2);
    }

    var oType = oString.match(rType)[1].toLowerCase();

    // 有针对性的比对方法 ( Regexp, Date, Function )
    if (oType in types) {
      return types[oType](obj, obj2);
    }

    // ( Elemnet )
    if (DomElement && obj instanceof DomElement) {
      return types.element(obj, obj2);
    }

    // ( Map, Set )
    if (isMap(obj) || isSet(obj)) {
      return equals$1(mapSetToArray(obj), mapSetToArray(obj2));
    }

    return types.object(obj, obj2);
  }

  var types = {

    /**
     * @param {Array} obj 
     * @param {Array} obj2 
     */
    array: function (obj, obj2) {
      var i,
          length = obj.length;

      if (length !== obj2.length) {
        return false;
      }

      for (i = 0; i < length; i++) {
        if (!equals$1(obj[i], obj2[i])) {
          return false;
        }
      }

      return true;
    },


    /**
     * @param {Object} obj 
     * @param {Object} obj2 
     */
    object: function (obj, obj2) {
      var _keys = keys(obj);
      var length = _keys.length;
      var i,
          key;

      if (length !== keys(obj2).length) {
        return false;
      }

      for (i = 0; i < length; i++) {
        key = _keys[i];

        if (!equals$1(obj[key], obj2[key])) {
          return false;
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

  defineValue(Object, '$equals', equals$1);

  defineValue(ObjectProto, '$equals', function (obj2) {
    return equals$1(this, obj2);
  });

  // import './$assign/index';
  // import './$get/index';
  // import './$isEmptyObject/index';
  // import './$isPlainObject/index';
  // import './$self/index';
  // import './$set/index';

  // import './String/index';

})));
