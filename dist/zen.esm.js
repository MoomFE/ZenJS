/*!
 * Zen.js v2.1.0-bata
 * (c) 2018 Zhang_Wei
 * Released under the MIT License.
 */

var isArray = Array.isArray;

var defineProperty = Object.defineProperty;

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

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
    defineProperty(obj, name, Object.assign({}, options, options2));
  });
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

function parametersDefault(args, index, defaultValue) {
  var arg;

  if (args.length > index && (arg = args[index]) !== undefined) {
    return arg;
  }
  return defaultValue;
}

var slice = ArrayProto.slice;

function isString(obj) {
  return typeof obj === 'string';
}

var reHasUnicode = /[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/;

var reUnicode = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g;

function $toArray(value) {
  if (!value) {
    return [];
  }
  if (isString(value)) {
    if (reHasUnicode.test(value)) {
      return value.match(reUnicode) || [];
    } else {
      return value.split('');
    }
  }
  return slice.call(value);
}

defineValue(Array, '$toArray', $toArray);

function parametersRest(args) {
  var index = parametersDefault(arguments, 1, 0);
  var length = args.length;

  if (length > index) {
    return $toArray(args).$get(index, length);
  }
  return [];
}

function $add(self, index, args) {

  var len = args.length;

  if (index < 0) {
    index = self.length + index + 1;
  }

  for (var i = 0; i < len; i++) {
    self.splice(index++, 0, args[i]);
  }

  return self;
}

defineValue(ArrayProto, '$add', function (index) {
  return $add(this, index, parametersRest(arguments, 1));
});

defineValue(ArrayProto, '$concat', function () {
  var _this = this;

  $toArray(arguments).forEach(function (arg) {
    $add(_this, -1, isArray(arg) ? arg : [arg]);
  });
  return this;
});

defineValue(Array, '$copy', function (source, array) {
  return array ? array.concat(source) : source.concat();
});

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

function congruence(one, two) {
  return one === two;
}

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

defineValue(ArrayProto, '$get', function () {
  var index = parametersDefault(arguments, 0, 0),
      num = arguments[1];

  if (num == null) {
    return this[index];
  }
  return this.slice(index, num + index);
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

var addEventListener = 'addEventListener';
var addEventListenerPrivate = '__ZENJS_EVENT_ADD__';

var removeEventListener = 'removeEventListener';
var removeEventListenerPrivate = '__ZENJS_EVENT_REMOVE__';

var inBrowser = typeof window !== 'undefined';

inBrowser && defineValue(document, '$ready', function (func, data) {
  if (this.readyState === 'complete' || this.readyState !== 'loading' && !this.documentElement.doScroll) return func.apply(window, data);
  this[addEventListener]('DOMContentLoaded', function callback(event) {
    this.removeEventListener(event.type, callback);
    func.apply(window, data);
  });
});

var ElementProto = inBrowser ? Element.prototype : undefined;

var min = Math.min;

inBrowser && define(ElementProto, '_index', {
  get: function () {
    return this.parentElement ? this.$prevAll().length : -1;
  },
  set: function (toIndex) {
    var parent = this.parentElement;

    if (parent == null) {
      return;
    }

    var siblings = parent.children;
    var selfIndex = this._index;
    var currentIndex = min(siblings.length - 1, toIndex);

    if (selfIndex === currentIndex) {
      return;
    }

    var currentElem = siblings[currentIndex];

    parent.insertBefore(this, selfIndex < currentIndex ? currentElem.nextElementSibling : currentElem);
  }
});

var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

function access(elem, _className, handle, isToggle) {

  var classList = elem.classList,
      className = (_className || '').match(rnothtmlwhite) || [];

  if (handle === 'has') {
    var index = 0,
        length = className.length;

    for (; index < length; index++) {
      if (classList.contains(className[index]) === false) return false;
    }

    return length !== 0;
  }

  // 强制引导渲染元素
  elem.offsetHeight;

  if (isToggle) {
    className.forEach(function (_class) {
      classList.contains(_class) ? classList.remove(_class) : classList.add(_class);
    });
  } else {
    className.forEach(function (_class) {
      classList[handle](_class);
    });
  }

  return elem;
}

inBrowser && defineValue(ElementProto, {
  $addClass: function (className) {
    return access(this, className, 'add');
  },
  $removeClass: function (className) {
    return access(this, className, 'remove');
  },
  $hasClass: function (className) {
    return access(this, className, 'has');
  },
  $toggleClass: function (className, tSwitch) {
    var notSwitch = !(arguments.length > 1);

    return access(this, className, notSwitch ? null : tSwitch ? 'add' : 'remove', notSwitch);
  }
});

/**
 * 
 * @param {Element} node 当前 DOM 元素, 也可是 DOM 元素数组
 * @param {String} filter 过滤元素的 CSS 选择器和方法
 * @param {String} handle 获取下一个 DOM 元素的属性名
 * @param {Boolean} checkSelf 只检测传入 DOM 元素
 */
function Filter(node, filter, handle, checkSelf) {

  // 没有可过滤的元素
  if (node == null || node.length === 0) return node;

  // 没有过滤条件
  if (filter == null) {
    return node.nodeType ? checkSelf ? node : node[handle]
    // Node array
    : node;
  }

  var filterIsString = isString(filter);

  // Node
  if (node.nodeType) {

    if (checkSelf && (filterIsString ? node.$is(filter) : filter(node))) {
      return node;
    }

    if (filterIsString) {
      while ((node = node[handle]) && !node.$is(filter)) {}
    } else {
      while ((node = node[handle]) && !filter(node)) {}
    }

    return node;
  }

  // Node array
  return node.filter(filterIsString ? function (elem) {
    return elem.$is(filter);
  } : filter);
}

function dir(elem, handle) {
  var matched = [];

  while (elem = elem[handle]) {
    matched.push(elem);
  }

  return matched;
}

inBrowser && defineValue(ElementProto, '$child $children', function (filter) {
  return Filter($toArray(this.children), filter);
});

inBrowser && defineValue(ElementProto, {
  '$first $firstChild': function (filter) {
    return Filter(this.firstElementChild, filter, 'nextElementSibling', true);
  },
  '$last $lastChild': function (filter) {
    return Filter(this.lastElementChild, filter, 'previousElementSibling', true);
  }
});

inBrowser && defineValue(ElementProto, {
  $is: function (selector) {
    return selector.nodeType ? this === selector : isString(selector) ? this.matches(selector) : false;
  },
  $not: function (selector) {
    return !this.$is(selector);
  }
});

inBrowser && [['$next', 'nextElementSibling'], ['$prev', 'previousElementSibling']].forEach(function (arr) {

  var name = arr[0],
      fn = arr[1];
  var options = {};

  options[name] = function (filter) {
    return Filter(this, filter, fn);
  };
  options[name + 'All'] = function (filter) {
    return Filter(dir(this, fn), filter);
  };

  defineValue(ElementProto, options);
});

inBrowser && defineValue(ElementProto, {
  $parent: function (filter) {
    return Filter(this.parentElement, filter, null, true);
  },
  $parents: function (filter, checkSelf) {
    return Filter(this, filter, 'parentElement', checkSelf);
  }
});

inBrowser && [document, ElementProto].forEach(function (elem) {
  defineValue(elem, '$query', elem.querySelectorAll);
  defineValue(elem, '$queryFirst', elem.querySelector);
});

inBrowser && defineValue(ElementProto, '$siblings', function (filter) {
  var parent = this.parentElement;

  return parent ? Filter($toArray(parent.children).$deleteValue(this), filter) : [];
});

function $isEmptyObject(obj) {
  for (var a in obj) {
    return false;
  }
  return true;
}

defineValue(Object, '$isEmptyObject', $isEmptyObject);

var supportsEventTarget = inBrowser && 'EventTarget' in window;

var EventTarget = supportsEventTarget ? window.EventTarget.prototype : inBrowser ? [window, document, ElementProto] : undefined;

if (supportsEventTarget) {
  defineValue(EventTarget, addEventListenerPrivate, EventTarget[addEventListener]);
  defineValue(EventTarget, removeEventListenerPrivate, EventTarget[removeEventListener]);
} else if (EventTarget) {
  EventTarget.forEach(function (obj) {
    defineValue(obj, addEventListenerPrivate, obj[addEventListener]);
    defineValue(obj, removeEventListenerPrivate, obj[removeEventListener]);
  });
}

var DATA = '__ZENJS_DATA__';

/**
 * 获取存储在元素上的整个数据集, 如数据集不存在则创建
 * @param {Element} elem 
 * @returns {Object}
 */
function $_GetDatas(elem) {
  return elem[DATA] || (defineValue(elem, DATA, {}), elem[DATA]);
}

if (inBrowser) {

  defineValue(EventTarget, '$data', function $data(name, value, weakRead) {
    var self = this || window;
    var Data = $_GetDatas(self);

    // $data( {} )
    // $data( {}, weakRead )
    if (isObject(name)) {
      for (var _name in name) {
        $data.call(self, _name, name[_name], value);
      }
      return self;
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
    return self;
  });

  defineValue(EventTarget, '$hasData', function (name) {
    var Data = $_GetDatas(this || window);

    if ($isEmptyObject(Data)) {
      return false;
    }

    if (name == null) {
      return true;
    }

    return name in Data;
  });

  defineValue(EventTarget, '$deleteData', function (names) {
    var self = this || window;

    if (names == null) {
      self[DATA] = {};
      return self;
    }

    var Data = $_GetDatas(self);

    names.split(' ').forEach(function (name) {
      delete Data[name];
    });

    return self;
  });
}

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
var ZenJS = $create$1(true, {
  version: '2.1.0-bata'
});

if (inBrowser) {
  window.Zen = window.ZenJS = ZenJS;
}

/**
 * 根据传入命名空间, 调用一些功能或做一些判断
 * @param {String} name 需要解析哪一块的功能命名空间
 * @param {Array} namespace 元素的命名空间列表
 * @param {Element} elem 绑定事件的元素
 * @param {String} type 绑定的事件
 * @param {Object} options 其他属性
 */
function namespaceHandler(
// Self use
name, namespace,
// Handler use
elem, type, options) {
  // 没有命名空间
  if (namespace.length === 0) return;

  var _handlers = handlers[name];
  var _namespace = namespace.filter(function (name) {
    return name in _handlers;
  });
  var length = _namespace.length;

  // 没有功能命名空间
  if (length === 0) return;

  var i = 0,
      handlerName,
      handler;

  for (; i < length; i++) {
    handlerName = _namespace[i];
    handler = _handlers[handlerName];

    // check
    if (handler.type === undefined) {
      if (handler.handler(elem, type, namespace, options) === false) {
        return false;
      }
    }
  }
}

var handlers = {
  /**
   * 添加事件时
   */
  add: {},
  /**
   * 触发事件时
   */
  dispatch: {
    /**
     * 当事件是从绑定的元素本身触发时才触发回调
     */
    self: {
      handler: function (elem, type, namespace, event) {
        if (event.target !== event.currentTarget) {
          return false;
        }
      }
    }
  }
};

var add = handlers.add,
    dispatch = handlers.dispatch;

/**
 * .once || .one
 * 当命名空间有 .once 或 .one, 则会去已绑定的事件中进行查找,
 * 如果之前绑定过相同的命名空间 ( 也同样有 .once 或 .one ), 则本次绑定无效
 */
add.once = add.one = {
  handler: function (elem, type, namespace, events) {
    // 没有绑定过事件
    if (!(events = events[type])) return;

    var i = 0,
        len = events.length;

    for (; i < len; i++) {
      // 如果绑定了相同的命名空间的事件, 则当前事件不会再进行绑定
      if (namespace.$equals(events[i].namespace)) {
        return false;
      }
    }
  }
};

/**
 * .ctrl || .shift || .alt || .meta
 * 当按下了对应键盘按键时才触发回调
 */
['ctrl', 'shift', 'alt', 'meta'].forEach(function (key) {
  dispatch[key] = {
    handler: function (elem, type, namespace, event) {
      if (!event[key + 'Key']) return false;
    }
  };
});

/**
 * .left || .middle || .right
 * 当按下了对应鼠标按键时才触发回调
 */
['left', 'middle', 'right'].forEach(function (button, index) {
  dispatch[button] = {
    handler: function (elem, type, namespace, event) {
      if ('button' in event && event.button !== index) return false;
    }
  };
});

/**
 * 事件处理 => 添加事件3: 绑定事件
 * @param {Element} elem 需要绑定事件的对象
 * @param {Array} types 需要绑定的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} listener 绑定的事件
 * @param {Object} options 事件绑定参数
 * @param {Object} data 绑定事件时向方法传入的数据
 */
function add$1(elem, types, selector, listener, options, data) {

  var
  /** 存放当前元素下的所有事件 */
  events = elem.$data('events', {}, true),

  /** 事件总数 */
  length = types.length,
      tmp,
      type,
      namespace,
      handleOptions;

  var guid = listener.guid || (listener.guid = ZenJS.guid);

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

    if (namespaceHandler('add', namespace, elem, type, events) === false) {
      continue;
    }

    /** 该事件的所有参数 */
    handleOptions = {
      elem: elem,
      type: type,
      guid: guid,
      data: data,
      listener: listener,
      selector: selector,
      options: options,
      namespace: namespace,
      namespaceStr: namespace.join('.'),
      handle: function () {
        return ZenJS.EventListener.dispatch.apply(handleOptions, arguments);
      }
    };

    (events[type] || (events[type] = [])).push(handleOptions);

    if (options.passive) {
      elem[addEventListenerPrivate](type, handleOptions.handle, {
        passive: true,
        capture: options.capture || false
      });
    } else {
      elem[addEventListenerPrivate](type, handleOptions.handle, options.capture || false);
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

function returnFalse() {
  return false;
}

function returnTrue() {
  return true;
}

/*
 * event.target : 触发事件的元素
 * event.originalTarget : 绑定事件的元素, 如果是委托代理, 则为代理的元素
 * event.delegateTarget : 绑定事件的元素
 * event.relatedTarget : 事件的相关节点, mouseover 时移出的节点, mouseout 时移入的节点
 * 
 * event.preventDefault() : 阻止浏览器默认行为
 * event.stopPropagation() : 停止将事件冒泡到父节点
 * event.stopImmediatePropagation() : 停止将事件冒泡到父节点且停止当前元素后续事件执行
 */

function Event(src, props) {

  if (this instanceof ZenJS.Event === false) {
    return new ZenJS.Event(src, props);
  }

  // Event object
  if (src && src.type) {

    this.originalEvent = src;

    this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;

    this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

    for (var key in src) {
      if (!(key in this)) {
        this[key] = src[key];
      }
    }
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

var EventProto = Event.prototype = {
  constructor: Event
};

['preventDefault', 'stopPropagation', 'stopImmediatePropagation'].forEach(function (fn) {
  EventProto[fn] = function () {
    if (this.originalEvent) {
      this.originalEvent[fn]();
    }
  };
});

if (inBrowser) {
  ZenJS.Event = Event;
}

var addProp = Event.addProp = function addProp(name, get) {
  defineProperty(EventProto, name, {
    enumerable: true,
    configurable: true,

    get: isFunction(get) ? function () {
      if (this.originalEvent) {
        return get(this.originalEvent);
      }
    } : function () {
      return this[name];
    },
    set: function () {
      this[name] = value;
    }
  });
};

var rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/;

addProp('which', function (event) {
  var button;

  if (event.which == null && rkeyEvent.test(event.type)) {
    return event.charCode != null ? event.charCode : event.keyCode;
  }

  if (!event.which && (button = event.button) !== undefined && rmouseEvent.test(event.type)) {
    if (button & 1) return 1;
    if (button & 2) return 3;
    if (button & 4) return 2;
    return 0;
  }

  return event.which;
});

/**
 * 事件处理 => 触发事件
 * @param {DocumentEventMap} nativeEvent 当前触发的事件对象
 */
function dispatch$1(nativeEvent) {

  var self = this.elem;

  // 重写 event 对象
  var event = nativeEvent instanceof Event ? nativeEvent : new Event(nativeEvent);

  // 创建新的 argument
  var args = $toArray(arguments).$set(0, event);

  event.delegateTarget = self;
  event.handleOptions = this;
  event.data = this.data;

  var type = event.type;
  var selector = this.selector;

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
  } else {
    if (!event.currentTarget) {
      event.currentTarget = self;
    }
    if (!event.target) {
      event.target = self;
    }
  }

  if (namespaceHandler('dispatch', this.namespace, self, type, event) === false) {
    return;
  }

  var result = this.listener.apply(self, args);

  if (result === false && ZenJS.config.event.returnFalse) {
    event.preventDefault();
    event.stopPropagation();
  }

  return result;
}

/**
 * 事件处理 => 移除事件2: 移除事件
 * @param {Element} elem 需要移除事件的对象
 * @param {String} types 需要解绑的事件集
 * @param {Function} listener 解绑的事件
 * @param {String} selector 事件委托的选择器
 */
function remove(elem, types, listener, selector) {

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
    namespace = (tmp[2] || '').split('.').sort().join('.');
    /** 事件集 */
    handlers = events[type] || [];
    /** 事件集数量 */
    handlersLength = handlers.length;

    tmp = tmp[2] && new RegExp('^' + namespace + '$');

    while (handlersLength--) {
      handleOptions = handlers[handlersLength];

      // 检查注入到方法上的 guid 是否相同 ( 如果有 )
      if (!listener || listener.guid === handleOptions.guid) {
        // 检查命名空间是否相同 ( 如果有 )
        if (!tmp || tmp.test(handleOptions.namespaceStr)) {
          // 检查事件委托
          if (selector
          // 允许所有绑定的事件通过, 不管有没有事件委托
          ? selector === '**' ||
          // 允许所有有事件委托的事件通过
          selector === '*' && handleOptions.selector ||
          // 事件委托必须相同才能通过
          selector === handleOptions.selector
          // 允许所有没事件委托的事件通过
          : !handleOptions.selector) {
            // 移除事件
            elem[removeEventListenerPrivate](type, handleOptions.handle);
            // 移除事件缓存
            handlers.splice(handlersLength, 1);
          }
        }
      }
    }

    if (handlers.length === 0) {
      delete events[type];
    }
  }
}

/**
 * 触发绑定在元素上的事件( 只触发事件 )
 * @param {Element} elem 
 * @param {String} types 
 */
function emit(elem, types, data) {

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

    if (!type) {
      continue;
    }

    /** 命名空间 */
    namespace = (tmp[2] || '').split('.').sort().join();
    /** 事件集 */
    handlers = events[type] || [];
    /** 事件集数量 */
    handlersLength = handlers.length;

    tmp = tmp[2] && new RegExp('^' + namespace + '$');

    while (handlersLength--) {
      handleOptions = handlers[handlersLength];

      // 检查命名空间是否相同 ( 如果有 )
      if (!tmp || tmp.test(handleOptions.namespaceStr)) {
        // 检查事件委托
        if (!handleOptions.selector) {
          handleOptions.handle.apply(null, data.$unshift(type));
        }
      }
    }
  }
}

var EventListener = $create$1(true, {
  add: add$1,
  dispatch: dispatch$1,
  remove: remove,
  emit: emit,
  namespaceHandler: namespaceHandler
});

if (inBrowser) {
  ZenJS.EventListener = EventListener;
}

var supportsPassiveEvent = false;

try {

  var options = defineProperty({}, 'passive', {
    get: function () {
      supportsPassiveEvent = true;
    }
  });

  window[addEventListener]('test', null, options);
} catch (e) {}

/**
 * 事件处理 => 添加事件2: 参数处理
 * @param {Element} elem 需要绑定事件的对象
 * @param {String} types 需要绑定的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} listener 绑定的事件
 * @param {Object} options 事件绑定参数
 */
function on(elem, types, selector, listener, options) {
  var events,
      data;

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
      selector = listener;
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
      on(elem, type, events[type], selector, options);
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
      if (!options) options = selector;
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

  if (options.data) {
    data = options.data;
    delete options.data;
  }

  Object.keys(options).forEach(function (key) {
    options[key] ? options[key] = true : delete options[key];
  });

  if (this === true || 'one' in options || 'once' in options) {
    var origListener = listener;

    listener = function (event) {
      elem.$off(event);
      return origListener.apply(this, arguments);
    };

    listener.guid = origListener.guid || (origListener.guid = ZenJS.guid);

    delete options.one;
    delete options.once;
  }

  if ('passive' in options && !supportsPassiveEvent) {
    delete options.passive;
  }

  return EventListener.add(elem, types, selector, listener, options, data), elem;
}

/**
 * 事件处理 => 移除事件1: 获取并处理参数
 * @param {String} types 需要解绑的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} listener 解绑的事件
 */
function off(types, selector, listener) {

  var handleOptions;

  // $off( ZenJS.Event )
  if (types && types.delegateTarget && (handleOptions = types.handleOptions)) {
    off.call(types.delegateTarget, handleOptions.namespace ? handleOptions.type + "." + handleOptions.namespace.join('.') : handleOptions.type, handleOptions.listener, handleOptions.selector);
    return this;
  }

  // $off( object, select )
  if (isObject(types)) {
    for (var type in types) {
      off.call(this, type, selector, types[type]);
    }
    return this;
  }

  // $off( '*' )
  // $off( '**' )
  if (types === '*' || types === '**') {
    selector = types;
    types = listener = undefined;
  } else {
    // $off( types, listener )
    // $off( types, listener, selector )
    if (!isString(selector)) {
      var _ref = [selector, listener];
      listener = _ref[0];
      selector = _ref[1];
    }
    // $off( types, true || false )
    if (isBoolean(listener)) {
      listener = listener ? returnTrue : returnFalse;
    }
  }

  ZenJS.EventListener.remove(this, types, listener, selector);

  return this;
}

function $one(types, selector, listener, options) {
  return on.call(true, this, types, selector, listener, options);
}

inBrowser && defineValue(EventTarget, {
  /**
   * 事件处理 => 添加事件1: 获取参数
   */
  $on: function (types, selector, listener, options) {
    return on(this, types, selector, listener, options);
  },

  /**
   * 事件处理 => 添加事件1: 获取参数
   */
  $one: $one,
  $once: $one,
  /**
   * 事件处理 => 移除事件1: 获取并处理参数
   */
  $off: off,

  $emit: function (types) {
    var data = parametersRest(arguments, 1);

    return ZenJS.EventListener.emit(this, types, data), this;
  }
});

function $mean() {

  return $toArray(arguments).reduce(function (count, next) {
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

  $toArray(arguments).$each(function (key) {
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

  if (obj == null) return obj;

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

var keys = Object.keys;

var stringify = JSON.stringify;

function unFunctionObject(obj) {
  var type = typeof obj;
  return type !== 'object' && type !== 'function';
}

function $equals(obj, obj2, parent) {
  var index,
      length,
      key,
      oIsArray,
      oString;

  if (obj === obj2) {
    return true;
  }

  if (!obj || parent && parent === obj) {
    return false;
  } else if (toString.call(obj) !== toString.call(obj2)) {
    return false;
  } else if (unFunctionObject(obj)) {
    return false;
  } else if ($isPlainObject(obj) || (oIsArray = isArray(obj))) {
    if (oIsArray) {
      if (obj.length !== obj2.length) {
        return false;
      }
      for (index = 0, length = obj.length; index < length; index++) {
        if (!$equals(obj[index], obj2[index], obj)) {
          return false;
        }
      }
    } else {
      if (keys(obj).length !== keys(obj2).length) {
        return false;
      }
      for (key in obj) {
        if (!$equals(obj[key], obj2[key], obj)) {
          return false;
        }
      }
    }
  } else if (isFunction(obj.toString) && !(oString = obj.toString()).startsWith('[object ')) {
    if (obj2.toString() !== oString) {
      return false;
    }
  } else {
    try {
      if (stringify(obj) !== stringify(obj2)) {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  return true;
}

defineValue(Object, '$equals', $equals);

defineValue(ObjectProto, '$get', function (key) {
  return this[key];
});

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

function stringify$1(obj) {
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

inBrowser && defineValue(window, '$querystring', {
  stringify: stringify$1,
  parse: parse
});

inBrowser && defineValue(window, '$ready', function (func, data) {
  var self = this || window;

  if (self.document.readyState === 'complete') return func.apply(self, data);
  self[addEventListener]('load', function callback(event) {
    self.removeEventListener(event.type, callback);
    func.apply(self, data);
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

inBrowser && defineValue(window, '$typeof', $typeof);

var inject = $create$1(true);

/**
 * ZenJS 重写的 $on 和 $off 对浏览器自带的 addEventListener 和 removeEventListener 的注入
 */
var event;

inBrowser && defineProperty(inject, 'event', {
  get: function () {
    return event;
  },
  set: function (val) {
    if (!isBoolean(val) || event === val) return false;
    if (event = val) {
      if (supportsEventTarget) {
        defineValue(EventTarget, addEventListener, EventTarget.$on);
        defineValue(EventTarget, removeEventListener, EventTarget.$off);
      } else {
        EventTarget.forEach(function (obj) {
          defineValue(obj, addEventListener, obj.$on);
          defineValue(obj, removeEventListener, obj.$off);
        });
      }
    } else {
      if (supportsEventTarget) {
        defineValue(EventTarget, addEventListener, EventTarget[addEventListenerPrivate]);
        defineValue(EventTarget, removeEventListener, EventTarget[removeEventListenerPrivate]);
      } else {
        EventTarget.forEach(function (obj) {
          defineValue(obj, addEventListener, obj[addEventListenerPrivate]);
          defineValue(obj, removeEventListener, obj[removeEventListenerPrivate]);
        });
      }
    }
  },
  enumerable: true
});

var event$1 = $create$1(true, {
  /**
   * 当事件绑定的方法返回 false 时,
   * 是否阻止浏览器默认行为且停止事件冒泡
   */
  returnFalse: false
});

var config = ZenJS.config = $create$1(true);

// 注入到浏览器中的功能, 将会改变浏览器默认行为
config.inject = inject;

// 默认开启所有注入项
keys(inject).forEach(function (key) {
  inject[key] = true;
});

// 事件相关自定义配置
config.event = event$1;

var guid = 1;

defineProperty(ZenJS, 'guid', {
  get: function () {
    return guid++;
  }
});

var util = ZenJS.util = $create$1(true);

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
  define: define,
  defineGet: defineGet,
  defineValue: defineValue,
  returnTrue: returnTrue,
  returnFalse: returnFalse
});

util.supports = $create$1(true, {
  passiveEvent: supportsPassiveEvent,
  EventTarget: supportsEventTarget
});

export default ZenJS;
