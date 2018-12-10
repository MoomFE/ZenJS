/*!
 * Zen.js v5.0.0-beta.4
 * https://github.com/MoomFE/ZenJS
 * 
 * (c) 2018 Wei Zhang
 * Released under the MIT License.
 */

/**
 * Transplant from JavaScript Cookie
 * Version: 2.2.0
 * Homepage: https://github.com/js-cookie/js-cookie
 */
var rDecode = /(%[0-9a-zA-Z]{2})+/g;
var rObject = /^[\{\[]/;
var rDecodeValue = /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g;
var rDecodeKey = /%(23|24|26|2B|5E|60|7C)/g;
var rBrackets = /[\(\)]/g;
var _ZenJS = ZenJS,
    assign = _ZenJS.assign,
    isNumber = _ZenJS.isNumber,
    defineValue = _ZenJS.defineValue;

function decode(s) {
  return s.replace(rDecode, decodeURIComponent);
}

function set(key, value, attributes) {
  attributes = assign({
    path: '/'
  }, attributes);

  if (isNumber(attributes.expires)) {
    attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
  } // We're using "expires" because "max-age" is not supported by IE


  attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

  try {
    var result = JSON.stringify(value);

    if (rObject.test(result)) {
      value = result;
    }
  } catch (error) {}

  value = encodeURIComponent(String(value)).replace(rDecodeValue, decodeURIComponent);
  key = encodeURIComponent(String(key)).replace(rDecodeKey, decodeURIComponent).replace(rBrackets, escape);
  var stringifiedAttributes = '';
  var attributeName;

  for (attributeName in attributes) {
    if (!attributes[attributeName]) {
      continue;
    }

    stringifiedAttributes += '; ' + attributeName;

    if (attributes[attributeName] === true) {
      continue;
    }

    stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
  }

  return document.cookie = key + '=' + value + stringifiedAttributes;
}

function get(key, json) {
  var jar = {};
  var cookies = document.cookie ? document.cookie.split('; ') : [];
  var length = cookies.length;
  var i = 0,
      parts,
      cookie,
      name;

  for (; i < length; i++) {
    parts = cookies[i].split('=');
    cookie = parts.slice(1).join('=');

    if (!json && cookie.charAt(0) === '"') {
      cookie = cookie.slice(1, -1);
    }

    try {
      name = decode(parts[0]);
      cookie = decode(cookie);

      if (json) {
        try {
          cookie = parse(cookie);
        } catch (error) {}
      }

      jar[name] = cookie;

      if (key === name) {
        break;
      }
    } catch (error) {}
  } // key is String or undefined


  return key !== undefined ? jar[key] : jar;
}

defineValue(document, '$cookie', function (key, value, attributes) {
  var length = arguments.length; // getter JSON

  if (!length) {
    return get(key, true);
  } // getter one


  if (length === 1) {
    return get(key || key + '', false);
  } // setter


  return set(key, value, attributes);
});
defineValue(document, '$deleteCookie $removeCookie', function (key, attributes) {
  set(key, '', assign(attributes || {}, {
    expires: -1
  }));
});
