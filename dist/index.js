/*!
 * Zen.js v1.0.0
 * (c) 2018 Zhang_Wei
 * Released under the MIT License.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    alert(123);

    function log (message) {
        console.log(message);
    }

    for (var i = 0; i < 100; i++) {
        log(i);
    }

})));
