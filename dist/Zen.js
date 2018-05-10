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

  var ElementProto = Element.prototype;

  /**
   * [ winodw, document, Element.prototype ]
   */
  var winDocEle = [window, document, ElementProto];

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
   * 判断传入对象是否是空对象
   * @param {Object} obj 需要判断的对象
   */
  function $isEmptyObject(obj) {
    for (var a in obj) {
      return false;
    }
    return true;
  }

  defineValue(Object, '$isEmptyObject', $isEmptyObject);

  /**
   * 判断传入对象是否是对象
   * @param {Object} obj 需要判断的对象
   */
  function isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }

  /**
   * 获取存储在元素上的整个数据集, 如数据集不存在则创建
   * @param {Element} elem 
   * @returns {Object}
   */
  function $_GetDatas(elem) {
    var Datas = elem[elem] || (elem[elem] = {});
    return Datas;
  }

  /**
   * 将数据读取或存储
   * @param {String} name 需要读取或存储的数据名称, 如果未传入 name, 则返回整个数据集
   * @param {Object} value 存储的数据
   * @param {Boolean} weakRead 当前值为 true 时, 同样视为读取, 当前名称下有数据返回数据, 如无数据, 将 value 赋值并返回
   * @returns {Object}
   */
  defineValue(winDocEle, '$data', function $data(name, value, weakRead) {
    var Data = $_GetDatas(this);

    // $data( {} )
    // $data( {}, weakRead )
    if (isObject(name)) {
      for (var _name in name) {
        $data.call(this, _name, name[_name], value);
      }
      return this;
    }

    // 读取
    // $data( name )
    // $data( name, value, true )
    if (arguments.length < 2 || weakRead) {
      if (name == null) return Data;
      if (weakRead && !(name in Data)) return Data[name] = value;
      return Data[name];
    }

    // $data( name, value )
    Data[name] = value;
    return this;
  });

  /**
   * 传入数据名称, 判断当前对象下是否存储了这个数据
   * @param {String} name 需要判断的数据名称, 如果未传入 name, 则是判断是否存有数据
   * @returns {Boolean}
   */
  defineValue(winDocEle, '$hasData', function (name) {
    var Data = $_GetDatas(this);

    if ($isEmptyObject(Data)) {
      return false;
    }

    if (name == null) {
      return true;
    }

    return name in Data;
  });

  /**
   * 传入数据名称, 删除当前对象下存储的相应名称的数据
   * @param {String} name 需要删除的数据名称, 多个可使用空格分隔, 如果未传入 names, 则视为删除全部数据
   * @returns {Object}
   */
  defineValue(winDocEle, '$deleteData', function (names) {

    if (names == null) {
      this[this] = {};
      return this;
    }

    var Data = $_GetDatas(this);

    names.split(' ').forEach(function (name) {
      delete Data[name];
    });

    return this;
  });

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
   * 改写自 jQuery
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
   * ZenJS
   */
  var Zen = window.Zen = $create(true, {
    version: '1.0.0-alpha.0'
  });

  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  /**
   * 事件处理 => 添加事件3: 绑定事件
   * @param {Element} elem 需要绑定事件的对象
   * @param {Array} types 需要绑定的事件集
   * @param {String} selector 事件委托的选择器
   * @param {Function} listener 绑定的事件
   * @param {Object} options 事件绑定参数
   */
  function add(elem, types, selector, listener, options) {

    var
    /** 存放当前元素下的所有事件 */
    events = elem.$data('events', {}, true),

    /** 事件总数 */
    length = types.length,
        tmp = void 0,
        type = void 0,
        handleOptions = void 0;

    while (length--) {

      /** 分离事件名称和命名空间 */
      tmp = rtypenamespace.exec(types[length]) || [''];
      /** 事件名称 */
      type = tmp[1];

      if (!type) {
        continue;
      }

      /** 该事件的所有参数 */
      handleOptions = {
        elem: elem,
        type: type,
        listener: listener,
        selector: selector,
        options: options,
        /** 命名空间 */
        namespace: (tmp[2] || '').split('.').sort(),
        handle: function () {
          return Zen.event.dispatch.apply(handleOptions, arguments);
        }
      };

      (events[type] || (events[type] = [])).push(handleOptions);

      if (options.passive) {
        elem.addEventListener(type, handleOptions.handle, options);
      } else {
        elem.addEventListener(type, handleOptions.handle, options.capture || false);
      }
    }
  }

  /**
   * @returns {Boolean} false
   */
  function returnFalse() {
    return false;
  }

  /**
   * @returns {Boolean} true
   */
  function returnTrue() {
    return true;
  }

  Zen.Event = function (src, props) {

    if (!(this instanceof Zen.Event)) {
      return new Zen.Event(src, props);
    }
  };

  Zen.Event.prototype = {
    constructor: Zen.Event,
    // 是否调用过 event.preventDefault 方法
    isDefaultPrevented: returnFalse,
    // 是否调用过 stopPropagation 方法
    isPropagationStopped: returnFalse,
    // 是否调用过 stopImmediatePropagation 方法
    isImmediatePropagationStopped: returnFalse,
    // 是否是模拟的 event
    isSimulated: false
  };

  [
  // 阻止浏览器默认事件
  ['preventDefault', 'isDefaultPrevented'],
  // 停止将事件冒泡到父节点
  ['stopPropagation', 'isPropagationStopped'],
  // 停止将事件冒泡到父节点且停止当前元素后续事件执行
  ['stopImmediatePropagation', 'isImmediatePropagationStopped']].forEach(function (ref) {
    var fn = ref[0],
        judgement = ref[1];

    this[fn] = function () {
      var event = void 0;

      if (this[judgement]()) {
        return;
      } else {
        this[judgement] = returnTrue;
      }

      if (!this.isSimulated && (event = this.originalEvent)) {
        event[fn]();
      }
    };
  }.bind(Zen.Event.prototype));

  function fix(originalEvent) {
    return originalEvent[Zen.version] ? originalEvent : Zen.Event(originalEvent);
  }

  /**
   * 事件处理 => 触发事件
   * @param {Event} nativeEvent 当前触发的事件对象
   */
  function dispatch(nativeEvent) {}

  var event = Zen.event = {
    add: add,
    fix: fix,
    dispatch: dispatch
  };

  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

  var supportsPassiveEvent = false;

  try {

    var options = defineProperty({}, 'passive', {
      get: function () {
        supportsPassiveEvent = true;
      }
    });

    window.addEventListener('test', null, options);
  } catch (e) {}

  /**
   * 判断传入对象是否是方法
   * @param {Object} obj 需要判断的对象
   */
  function isString(obj) {
    return typeof obj === 'string';
  }

  /**
   * 事件处理 => 添加事件2: 参数处理
   * @param {Element} elem 需要绑定事件的对象
   * @param {String} types 需要绑定的事件集
   * @param {String} selector 事件委托的选择器
   * @param {Function} listener 绑定的事件
   * @param {Object} options 事件绑定参数
   */
  function on(elem, types, selector, listener, options) {
    var events = void 0;

    // on( elem, { type: listener || Boolean } )
    // on( elem, { type: listener || Boolean }, options )
    // on( elem, { type: listener || Boolean }, selector )
    // on( elem, { type: listener || Boolean }, selector, options )
    if (isObject(types)) {
      events = types;

      if (isString(selector)) {
        options = listener;
      } else {
        options = selector;
        selector = undefined;
      }
    }
    // on( elem, selector, { type: listener || Boolean } )
    // on( elem, selector, { type: listener || Boolean }, options )
    else if (isObject(selector)) {
        events = selector;
        selector = types;
        options = listener;
      }

    if (events) {
      for (var type in events) {
        on(elem, type, selector, events[type], options);
      }
      return elem;
    }

    if (types == false || types == null) {
      return elem;
    } else {
      types = types.match(rnothtmlwhite);

      if (types == null || types.length === 0) {
        return elem;
      }
    }

    // on( elem, types, listener || Boolean )
    // on( elem, types, listener || Boolean, selector )
    // on( elem, types, listener || Boolean, options || useCapture )
    // on( elem, types, listener || Boolean, selector, options || useCapture )
    if (!isString(selector)) {
      var _ref = [selector, listener];
      listener = _ref[0];
      selector = _ref[1];


      if (!isString(selector)) {
        options = selector;
        selector = undefined;
      }
    }

    if (listener == null) {
      return elem;
    }

    if (isBoolean(listener)) {
      listener = listener ? returnTrue : returnFalse;
    }

    if (!listener) {
      return elem;
    }

    // useCapture
    if (isBoolean(options)) {
      options = { capture: options };
    }

    options = options || {};

    Object.keys(options).forEach(function (key) {
      options[key] ? options[key] = true : delete options[key];
    });

    if ('once' in options) {
      var origListener = listener;

      listener = function (event$$1) {
        elem.$off(event$$1);
        return origListener.apply(this, arguments);
      };

      delete options.once;
    }

    if ('passive' in options && !supportsPassiveEvent) {
      delete options.passive;
    }

    return event.add(elem, types, selector, listener, options), elem;
  }

  // EventTarget

  /**
   * 事件处理 => 添加事件1: 获取参数
   */
  defineValue(EventTarget.prototype, '$on', function (types, selector, listener, options) {
    return on(this, types, selector, listener, options);
  });

})));
