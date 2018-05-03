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

  var Zen = window.Zen = Object.create(null);

  var Element = window.Element;
  var ElementProto = Element.prototype;

  var Array = window.Array;
  var isArray = Array.isArray;

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
  function $_Define(obj, name, options, options2) {

    if (isArray(obj)) {

      obj.forEach(function (obj) {
        $_Define(obj, name, options, options2);
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
  function $_DefineValue(obj, name, value, options) {
    $_Define(obj, name, { value: value }, options);
  }

  var injectionArr = [window, document, ElementProto];

  /**
   * 获取存储在元素上的整个数据集, 如数据集不存在则创建.
   * @param {Element} elem 
   * @returns {Object}
   */
  function $_GetDatas(elem) {
    var Datas = elem[elem] || (elem[elem] = {});
    return Datas;
  }

  /**
   * 将数据读取或存储, 如 name 为 null, 则返回整个数据集.
   * @param {String} name 需要读取或存储的数据名称
   * @param {Object} value 存储的数据
   * @returns {Object}
   */
  $_DefineValue(injectionArr, '$data', function (name, value) {
    var Data = $_GetDatas(this);

    if (arguments.length > 1) {
      Data[name] = value;
      return this;
    }

    return name == null ? Data : Data[name];
  });

  /**
   * 传入数据名称, 判断当前对象下是否存储了这个数据.
   * @param {String} name 需要判断的数据名称
   * @returns {Boolean}
   */
  $_DefineValue(injectionArr, '$hasData', function (name) {
    if (name == null) {
      return !!this[this];
    }
    return get(this).hasOwnProperty(name);
  });

  /**
   * 传入数据名称, 删除当前对象下存储的相应名称的数据
   * @param {String} name 需要删除的数据名称
   * @returns {Object}
   */
  $_DefineValue(injectionArr, '$deleteData', function () {
    var Data = get(this);

    names.split(' ').forEach(function (name) {
      delete Data[name];
    });

    return this;
  });

  Zen.version = '1.0.0-alpha.0';

})));
