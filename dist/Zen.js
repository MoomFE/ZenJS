/*!
 * Zen.js v2.0.0-beta.0
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
   * 判断传入对象是否是对象且不为null
   * @param {Object} obj 需要判断的对象
   */
  function isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }

  function define(obj, name, options, options2) {
    var key;

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

    defineProperty(obj, name, Object.assign({}, options, options2));
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
   * 定义对象属性, 快捷定义 value 选项
   * @param {Object} obj 需要添加属性的元素
   * @param {String} name 属性名
   * @param {Function} value 添加到 value 选项的方法
   * @param {Object} options 属性选项
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
   * @param {Number} index 需要在 arguments 中取得默认值的下标
   * @param {Object} defaultValue 若未传入值时取得默认值
   */
  function parametersDefault(args, index, defaultValue) {
    var arg;

    if (args.length > index && (arg = args[index]) !== undefined) {
      return arg;
    }
    return defaultValue;
  }

  defineValue(ArrayProto, '$get', function () {
    var index = parametersDefault(arguments, 0, 0),
        num = arguments[1];

    if (num == null) {
      return this[index];
    }
    return this.slice(index, num + index);
  });

  /**
   * 获取方法从指定位开始的剩余参数
   * @param {IArguments} args arguments
   * @param {Number} index 需要在 arguments 中开始取参数的下标 - default: 0
   */
  function parametersRest(args) {
    var index = parametersDefault(arguments, 1, 0);
    var length = args.length;

    if (length > index) {
      return Array.from(args).$get(index, length);
    }
    return [];
  }

  defineValue(ArrayProto, '$add', function (index) {
    var i = 0;
    var args = parametersRest(arguments, 1),
        len = args.length;

    for (; i < len; i++) {
      this.splice(index++, 0, args[i]);
    }

    return this;
  });

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

  defineValue(ArrayProto, '$delete', function (index) {
    var num = parametersDefault(arguments, 1, 1);

    return this.splice(index, num), this;
  });

  /**
   * 判断两个参数是否全等
   */
  function congruence(one, two) {
    return one === two;
  }

  /**
   * 判断两个参数是否相等
   */
  function equals(one, two) {
    return one == two;
  }

  defineValue(ArrayProto, '$deleteValue', function (value) {
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

  defineValue(ArrayProto, '$inArray', function (obj) {
    var i = 0,
        len = this.length;

    for (; i < len; i++) {
      if (this[i] == obj) return true;
    }return false;
  });

  'push_unshift_pop_shift'.split('_').forEach(function (key) {
    defineValue(ArrayProto, "$" + key, function () {
      return this[key].apply(this, arguments), this;
    });
  });

  defineValue(document, '$ready', function (func, data) {
    if (this.readyState === 'complete' || this.readyState !== 'loading' && !this.documentElement.doScroll) return func.apply(window, data);
    this.addEventListener('DOMContentLoaded', function callback(event) {
      this.removeEventListener(event.type, callback);
      func.apply(window, data);
    });
  });

  function $isEmptyObject(obj) {
    for (var a in obj) {
      return false;
    }
    return true;
  }

  defineValue(Object, '$isEmptyObject', $isEmptyObject);

  var EventTargetProto = EventTarget.prototype;

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
  defineValue(EventTargetProto, '$data', function $data(name, value, weakRead) {
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
  defineValue(EventTargetProto, '$hasData', function (name) {
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
  defineValue(EventTargetProto, '$deleteData', function (names) {

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

  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

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

  /**
   * ZenJS
   */
  var ZenJS$1 = window.Zen = window.ZenJS = $create$1(true, {
    version: '2.0.0-beta.0'
  });

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
        tmp,
        type,
        namespace,
        handleOptions;

    var guid = listener.guid || (listener.guid = ZenJS$1.guid);

    while (length--) {

      /** 分离事件名称和命名空间 */
      tmp = rtypenamespace.exec(types[length]) || [];
      /** 事件名称 */
      type = tmp[1];

      if (!type) {
        continue;
      }

      /** 命名空间 */
      namespace = (tmp[2] || '').split('.').sort();

      /** 该事件的所有参数 */
      handleOptions = {
        elem: elem,
        type: type,
        guid: guid,
        listener: listener,
        selector: selector,
        options: options,
        namespace: namespace,
        namespaceStr: namespace.join('.'),
        handle: function () {
          return ZenJS$1.EventListener.dispatch.apply(handleOptions, arguments);
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

  defineValue(ObjectProto, '$set', function (key, value) {
    var _key;

    if (isObject(key)) for (_key in key) {
      this[_key] = key[_key];
    } else this[key] = value;

    return this;
  });

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

  var assign = Object.assign;

  /**
   * event.target : 触发事件的元素
   * event.originalTarget : 绑定事件的元素, 如果是委托代理, 则为代理的元素
   * event.delegateTarget : 绑定事件的元素
   * event.relatedTarget : 事件的相关节点, mouseover 时移出的节点, mouseout 时移入的节点
   */

  function Event(src, props) {

    if (this instanceof ZenJS$1.Event === false) {
      return new ZenJS$1.Event(src, props);
    }

    // Event object
    if (src && src.type) {

      this.originalEvent = src;
      this.type = src.type;

      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;

      this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget;
    }
    // Event type
    else {
        this.type = src;
      }

    if (props) {
      $assign(this, props);
    }

    this.timeStamp = src && src.timeStamp || Date.now();
  }

  ZenJS$1.Event = Event;

  var EventProto = ZenJS$1.Event.prototype = {
    constructor: ZenJS$1.Event,
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

    EventProto[fn] = function () {
      var event;

      if (EventProto[judgement]()) {
        return;
      } else {
        EventProto[judgement] = returnTrue;
      }

      if (!EventProto.isSimulated && (event = EventProto.originalEvent)) {
        event[fn]();
      }
    };
  });

  function addProp(name, get, set) {
    defineProperty(EventProto, name, assign({}, defineGetPropertyOptions, {
      get: get || function () {
        var originalEvent = this.originalEvent;
        if (originalEvent) {
          return originalEvent[name];
        }
      },
      set: set || function (value) {
        this[name] = value;
      }
    }));
  }
  Event.addProp = addProp;

  ['altKey', 'bubbles', 'cancelable', 'changedTouches', 'ctrlKey', 'detail', 'eventPhase', 'metaKey', 'pageX', 'pageY', 'shiftKey', 'view', 'char', 'charCode', 'key', 'keyCode', 'button', 'buttons', 'clientX', 'clientY', 'offsetX', 'offsetY', 'pointerId', 'pointerType', 'screenX', 'screenY', 'targetTouches', 'toElement', 'touches'].forEach(function (name) {
    return addProp(name);
  });

  /**
   * 事件处理 => 触发事件
   * @param {Event} nativeEvent 当前触发的事件对象
   */
  function dispatch(nativeEvent) {

    var self = this.elem;

    // 重写 event 对象
    var event = nativeEvent instanceof Event ? nativeEvent : new Event(nativeEvent);

    // 创建新的 argument
    var args = Array.from(arguments).$set(0, event);

    event.delegateTarget = self;
    event.handleOptions = this;

    var type = event.type;
    var selector = this.selector,
        needsContext = this.needsContext;

    // 如果有事件委托

    if (selector && !(type === 'click' && event.button >= 1)) {
      var cur = event.target;

      // 从被点击的元素开始, 一层一层往上找
      for (; cur !== self; cur = cur.parentNode || self) {
        // 是元素节点
        // 如果当前是点击事件, 将不处理禁用的元素
        if (cur.nodeType === 1 && !(type === 'click' && cur.disabled === true)) {
          if (cur.matches(selector)) {
            self = event.currentTarget = cur;
            break;
          }
        }
      }

      if (event.delegateTarget === self) {
        return;
      }
    }

    var result = this.listener.apply(self, args);

    if (result === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    return result;
  }

  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

  /**
   * 事件处理 => 移除事件2: 移除事件
   * @param {Element} elem 需要移除事件的对象
   * @param {Array} types 需要解绑的事件集
   * @param {Function} listener 解绑的事件
   * @param {String} selector 事件委托的选择器
   */
  function remove(elem, types, listener, selector, mappedTypes) {

    if (!elem.$hasData('events')) {
      return;
    }

    types = (types || '').match(rnothtmlwhite) || [''];

    var
    /** 存放当前元素下的所有事件 */
    events = elem.$data('events'),

    /** 事件总数 */
    length = types.length,
        tmp,
        type,
        namespace,
        handlers,
        handlersLength,
        handleOptions;

    while (length--) {

      /** 分离事件名称和命名空间 */
      tmp = rtypenamespace.exec(types[length]) || [];
      /** 事件名称 */
      type = tmp[1];

      // 解绑所有事件
      if (!type) {
        for (type in events) {
          remove(elem, type + types[length], listener, selector, true);
        }
        continue;
      }

      /** 命名空间 */
      namespace = (tmp[2] || '').split('.').sort();
      /** 事件集 */
      handlers = events[type] || [];
      /** 事件集数量 */
      handlersLength = handlers.length;

      tmp = tmp[2] && new RegExp("(^|\\.)" + namespace.join("\\.(?:.*\\.|)") + "(\\.|$)");

      while (handlersLength--) {
        handleOptions = handlers[handlersLength];

        if (
        // 检查注入到方法上的 guid 是否相同
        (!listener || listener.guid === handleOptions.guid) && (
        // 检查命名空间是否相同
        !tmp || tmp.test(handleOptions.namespaceStr)) &&
        // 检查事件委托
        selector
        // 允许所有绑定的事件通过, 不管有没有事件委托
        ? selector === '**' ? true
        // 允许所有有事件委托的事件通过
        : selector === '*' ? !!handleOptions.selector
        // 事件委托必须相同才能通过
        : selector === handleOptions.selector
        // 允许所有没事件委托的事件通过
        : !handleOptions.selector) {
          // 移除事件
          elem.removeEventListener(type, handleOptions.listener);
          // 移除事件缓存
          handlers.splice(handlersLength, 1);
        }
      }

      if (handlers.length === 0) {
        delete events[type];
      }
    }
  }

  var EventListener = ZenJS$1.EventListener = {
    add: add,
    dispatch: dispatch,
    remove: remove
  };

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
   * 判断传入对象是否是字符串
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
    var events;

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

    if (!types) return elem;else {
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

    if ('once' in options || this === true) {
      var origListener = listener;

      listener = function (event) {
        elem.$off(event);
        return origListener.apply(this, arguments);
      };

      listener.guid = origListener.guid || (origListener.guid = ZenJS.guid);

      delete options.once;
    }

    if ('passive' in options && !supportsPassiveEvent) {
      delete options.passive;
    }

    return EventListener.add(elem, types, selector, listener, options), elem;
  }

  /**
   * 事件处理 => 移除事件1: 获取并处理参数
   * @param {String} types 需要解绑的事件集
   * @param {String} selector 事件委托的选择器
   * @param {Function} listener 解绑的事件
   */
  function off(types, selector, listener) {

    var handleOptions,
        type;

    // $off( ZenJS.Event )
    if (types && types.preventDefault && (handleOptions = types.handleOptions)) {

      off.call(types.delegateTarget, handleOptions.namespace ? handleOptions.type + "." + handleOptions.namespace.join('.') : handleOptions.type, handleOptions.selector, handleOptions.listener);

      return this;
    }

    // $off( object, select )
    if (isObject(types)) {
      for (type in types) {
        off.call(this, type, selector, types[type]);
      }
      return this;
    }

    if (isBoolean(listener)) {
      listener = listener ? returnTrue : returnFalse;
    }

    ZenJS$1.EventListener.remove(this, types, listener, selector);

    return this;
  }

  // EventTarget

  defineValue(EventTargetProto, {
    /**
     * 事件处理 => 添加事件1: 获取参数
     */
    $on: function (types, selector, listener, options) {
      return on(this, types, selector, listener, options);
    },

    /**
     * 事件处理 => 添加事件1: 获取参数
     */
    $one: function (types, selector, listener, options) {
      return on.call(true, this, types, selector, listener, options);
    },

    /**
     * 事件处理 => 移除事件1: 获取并处理参数
     */
    $off: off
  });

  function $mean() {

    return Array.from(arguments).reduce(function (count, next) {
      return count + next;
    }) / arguments.length;
  }

  defineValue(Math, '$mean', $mean);

  var random = Math.random;

  var floor = Math.floor;

  function _randomParameters(args) {
    var from = parametersDefault(args, 0, 9),
        to = parametersDefault(args, 1, 0);

    return from > to ? [to, from] : [from, to];
  }

  function _random(from, to) {
    return floor(random() * (to - from + 1) + from);
  }

  function $random() {
    var cache = _randomParameters(arguments);

    return _random(cache[0], cache[1]);
  }

  defineValue(Math, '$random', $random);

  var abs = Math.abs;

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

  defineValue(Math, '$randomPlus', $randomPlus);

  /**
   * 判断传入对象是否是数字
   * @param {Object} obj 需要判断的对象
   */
  function isNumber(obj) {
    return toString.call(obj) === '[object Number]';
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

  defineValue(ObjectProto, '$delete', function $delete() {
    var _this = this;

    Array.from(arguments).$each(function (key) {
      delete _this[key];
    });
    return this;
  });

  defineValue(ObjectProto, '$deleteValue', function $deleteValue(value) {
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

  /**
   * 定义对象属性, 快捷定义 get 选项
   * @param {Object} obj 需要添加属性的元素
   * @param {String} name 属性名
   * @param {Function} get 添加到 get 选项的方法
   * @param {Object} options 属性选项
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

  var fromCharCode = String.fromCharCode;

  function string$random() {
    var uppercase = parametersDefault(arguments, 0, false);

    return fromCharCode(uppercase ? $random(65, 90) : $random(97, 122));
  }

  defineValue(String, '$random', string$random);

  /**
   * 判断传入对象是否是正则
   * @param {Object} obj 需要判断的对象
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

  function stringify(obj) {
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

  defineValue(window, '$querystring', {
    stringify: stringify,
    parse: parse
  });

  defineValue(window, '$ready', function (func, data) {
    if (this.document.readyState === 'complete') return func.apply(this, data);
    this.addEventListener('load', function callback(event) {
      this.removeEventListener(event.type, callback);
      func.apply(this, data);
    });
  });

  function $typeof(obj) {
    var type;

    if (obj == null) return obj + '';
    if ((type = typeof obj) === 'object') {
      if (isArray(obj)) return 'array';
    }
    return type;
  }

  defineValue(window, '$typeof', $typeof);

  var guid = 1;

  defineProperty(ZenJS$1, 'guid', {
    get: function () {
      return guid++;
    }
  });

  var util = ZenJS$1.util = $create$1(true);

  util.is = $create$1(true, {
    equals: equals,
    congruence: congruence
  });

  util.types = $create$1(true, {
    isArray: isArray,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isNumber: isNumber,
    isObject: isObject,
    isRegExp: isRegExp,
    isString: isString
  });

  util.parameters = $create$1(true, {
    default: parametersDefault,
    rest: parametersRest
  });

  util.fn = $create$1(true, {
    returnTrue: returnTrue,
    returnFalse: returnFalse
  });

})));
