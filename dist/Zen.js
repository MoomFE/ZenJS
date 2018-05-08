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

  var _Element = Element;
  var ElementProto = _Element.prototype;
  var isArray = Array.isArray;
  var defineProperty = Object.defineProperty;
  var winDocEle = [window, document, ElementProto];

  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

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
  function isEmptyObject(obj) {
    for (var a in obj) {
      return false;
    }
    return true;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  /**
   * 判断传入对象是否是对象
   * @param {Object} obj 需要判断的对象
   */
  function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
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
      return name == null ? Data : weakRead ? Data.hasOwnProperty(name) ? Data[name] : Data[name] = value : Data[name];
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

    if (isEmptyObject(Data)) {
      return false;
    }

    if (name == null) {
      return true;
    }

    return Data.hasOwnProperty(name);
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

  /**
   * 判断传入对象是否是方法
   * @param {Object} obj 需要判断的对象
   */
  function isString(obj) {
    return typeof obj === 'string';
  }

  /**
   * 判断传入对象是否是逻辑值
   * @param {Object} obj 需要判断的对象
   */
  function isBoolean(obj) {
    return typeof obj === 'boolean';
  }

  /**
   * ZenJS
   */
  var Zen = window.Zen = Object.create(null);
  Zen.version = '1.0.0-alpha.0';

  /**
   * 事件处理 => 添加事件3: 绑定事件
   * @param {Element} elem 需要绑定事件的对象
   * @param {Array} types 需要绑定的事件集
   * @param {String} selector 事件委托的选择器
   * @param {Function} handler 绑定的事件
   * @param {Object} options 事件绑定参数
   */
  function add (elem, types, selector, handler, options) {

    var
    /** 存放当前元素下的所有事件 */
    events = elem.$data('events', {}, true),

    /** 事件列表下的命名空间 */
    eventsNamespace = Object.keys(options).sort().join('_'),

    /** 事件总数 */
    length = types.length;

    console.log(eventsNamespace);

    /*
      events: {
        click: {
          default: [
            // no options
          ],
          capture: [],
          passive: [],
          'capture passive': []
        },
        focus: ...
      }
    */

    // while( typeLength-- ){
    // }
  }

  var event = Zen.event = {
    global: {},
    add: add
  };

  var supportsPassiveEvent = false;

  try {

    var options = defineProperty({}, 'passive', {
      get: function get() {
        supportsPassiveEvent = true;
      }
    });

    window.addEventListener('test', null, options);
  } catch (e) {}

  /**
   * 事件处理 => 添加事件2: 参数处理
   * @param {Element} elem 需要绑定事件的对象
   * @param {String} types 需要绑定的事件集
   * @param {String} selector 事件委托的选择器
   * @param {Function} fn 绑定的事件
   * @param {Object} options 事件绑定参数
   */
  function on(elem, types, selector, fn, options) {
    var events = void 0;

    // on( elem, { type: fn || Boolean } )
    // on( elem, { type: fn || Boolean }, options )
    // on( elem, { type: fn || Boolean }, selector )
    // on( elem, { type: fn || Boolean }, selector, options )
    if (isObject(types)) {
      events = types;

      if (isString(selector)) {
        options = fn;
      } else {
        options = selector;
        selector = undefined;
      }
    }
    // on( elem, selector, { type: fn || Boolean } )
    // on( elem, selector, { type: fn || Boolean }, options )
    else if (isObject(selector)) {
        events = selector;
        selector = types;
        options = fn;
      }

    if (events) {
      for (var type in events) {
        on(elem, type, selector, events[type], options);
      }
      return elem;
    }

    if (types == false || types == null) {
      return;
    } else {
      types = types.match(rnothtmlwhite);

      if (types == null || types.length === 0) {
        return;
      }
    }

    // on( elem, types, fn || Boolean )
    // on( elem, types, fn || Boolean, selector )
    // on( elem, types, fn || Boolean, options || useCapture )
    // on( elem, types, fn || Boolean, selector, options || useCapture )
    if (!isString(selector)) {
      var _ref = [selector, fn];
      fn = _ref[0];
      selector = _ref[1];


      if (!isString(selector)) {
        options = selector;
        selector = undefined;
      }
    }

    if (fn == null) {
      return;
    }

    if (isBoolean(fn)) {
      fn = fn ? returnTrue : returnFalse;
    }

    // useCapture
    if (isBoolean(options)) {
      options = { capture: options };
    }

    options = options || {};

    if ('once' in options) {
      var origFn = fn;

      fn = function fn(event$$1) {
        elem.$off(event$$1);
        return origFn.apply(this, arguments);
      };

      delete options.once;
    }

    if ('passive' in options && !supportsPassiveEvent) {
      delete options.passive;
    }

    return event.add(elem, types, selector, fn, options), elem;
  }

  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }

  // EventTarget

  /**
   * 事件处理 => 添加事件1: 获取参数
   */
  defineValue(EventTarget.prototype, '$on', function (types, selector, fn, options) {
    return on(this, types, selector, fn, options);
  });

})));
