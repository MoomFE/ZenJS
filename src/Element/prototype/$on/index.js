// EventTarget
// target.addEventListener(type, listener, options);
// target.addEventListener(type, listener ,{capture: Boolean, passive: Boolean, once: Boolean});
// target.addEventListener(type, listener, useCapture);
// target.addEventListener(type, listener[, useCapture, wantsUntrusted  ]); 

// capture: false -> 表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
// once: false
// passive: false -> 承诺 listener 中不调用 preventDefault()


// target.$on( types, selector, listener, options )
// target.$on( types, selector, options, listener )

import define from '../../../shared/util/defineValue';
import { winDocEle } from '../../../shared/index';
import on from './access/on';

/**
 * 事件处理 => 添加事件1: 获取参数
 */
define( winDocEle, '$on', function( types, selector, fn, options ){
  return on( this, types, selector, fn, options );
});