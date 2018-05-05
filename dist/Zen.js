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

  var _window = window;
  var document = _window.document,
      Element = _window.Element,
      Array = _window.Array;
  var ElementProto = Element.prototype;
  var isArray = Array.isArray;

  var winDocEle = [window, document, ElementProto];

  var defineProperty = Object.defineProperty,
      definePropertyOptions = {
    configurable: true, // 删除/定义
    enumerable: false, // 枚举
    writable: true // 写
  };

  /**
   * 定义对象属性, 有默认配置
   * @param {Array} obj 需要添加属性的元素, 可为数组
   * @param {String} name 属性名
   * @param {Object} options 属性选项
   * @param {Object} options2 属性选项2
   */
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
  defineValue(winDocEle, '$data', function (name, value, weakRead) {
    var Data = $_GetDatas(this);

    // 读取
    if (arguments.length < 2 || weakRead) {
      return name == null ? Data : weakRead ? Data.hasOwnProperty(name) ? Data[name] : Data[name] = value : Data[name];
    }

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
   * ZenJS
   */
  var Zen = window.Zen = Object.create(null);

  var guid = 1;

  Object.defineProperty(Zen, 'guid', {
    get: function get() {
      return guid++;
    }
  });

  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

  /**
   * 添加事件的处理器
   * @param {Element} elem 需要绑定事件的对象
   * @param {Array} types 需要绑定的事件集
   * @param {Function} handler 绑定的事件
   * @param {Object} options 事件绑定参数
   * @param {String} selector 事件委托的选择器
   */
  function add(elem, types, handler, options, selector) {

    var elemData = elem.$data(),
        guid = void 0,
        events = void 0,
        eventHandle = void 0,
        typesLength = types.length;

    guid = handler.guid || (handler.guid = Zen.guid);

    events = elemData.events || (elemData = {});

    eventHandle = elemData.handle || (elemData.handle = eventHandleFn.bind(elem));

    while (typesLength--) {

      // 尝试分离事件和命名空间
      // 'event.a.b' => [ 'event.a.b', 'event', 'a.b' ]
      var tmp = rtypenamespace.exec(type[typesLength]) || [],
          origType = void 0,
          type = origType = tmp[1],
          namespaces = void 0,
          special = void 0,
          handleObj = void 0;

      if (!type) {
        continue;
      }

      // 取出命名空间
      // 'a.b' => [ 'a', 'b' ]
      namespaces = (tmp[2] || '').split('.').sort();

      // 兼容性处理
      special = Zen.event.special[type] || {};
      type = (selector ? special.delegateType : special.bindType) || type;
      special = Zen.event.special[type] || {};

      // 创建事件处理对象
      // 这里保存了事件相关的各种属性
      handleObj = Object.assign({
        type: type,
        origType: origType,
        options: options,
        handler: handler,
        guid: guid,
        selector: selector,
        needsContext: selector && needsContext.test(selector),
        namespace: namespaces.join('.')
      } /* handleObjIn */);
    }
  }

  var needsContext = /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i;

  function eventHandleFn(event) {
    return typeof Zen !== 'undefined' && Zen.event.triggered !== event.type ? Zen.event.dispatch(this, arguments) : undefined;
  }

  var event = {
    global: {},
    add: add
  };

  Zen.event = event;

  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  /**
   * 判断传入对象是否是对象
   * @param {Object} obj 需要判断的对象
   */
  function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  }

  // EventTarget

  function returnFalse() {
    return false;
  }

  /**
   * 将参数各种可能的情况进行梳理调整
   * 最后交给 Zen.event.add
   */
  function on(elem, types, selector, options, fn) {

    // on( elem, {}, selector, options )
    if (isObject(types)) {

      // on( elem, {}, options )
      if (typeof selector !== 'string') {

        options = options || selector;
        selector = undefined;
      }
      for (var type in types) {
        on(elem, type, selector, options, types[type]);
      }
      return elem;
    }

    // on( elem, types, fn )
    if (options == null && fn == null) {
      fn = selector;
      options = selector = undefined;
    }
    // on( elem, types, selector || options, fn )
    else if (fn == null) {

        // on( elem, types, selector, fn )
        if (typeof selector === 'string') {
          fn = options;
          options = undefined;
        }
        // on( elem, types, options, fn )
        else {
            fn = options;
            options = selector;
            selector = undefined;
          }
      }

    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }

    if (options && options.once) {
      var origFn = fn;
      fn = function fn(event) {
        elem.$off(event);
        return origFn.apply(this, arguments);
      };

      fn.guid = origFn.guid || Zen.guid;
    }

    types = (types || '').match(rnothtmlwhite) || [''];

    return Zen.event.add(elem, types, fn, options, selector), elem;
  }

  defineValue(winDocEle, '$on', function (types, selector, fn, options) {
    return on(this, types, selector, options, fn);
  });

  Zen.version = '1.0.0-alpha.0';

})));
