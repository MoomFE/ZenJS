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

import './$data/index';

import defineValue from '../shared/util/defineValue';
import on from './access/on';
import off from './access/off';
import EventTargetProto from '../shared/global/EventTarget/prototype/index';


defineValue( EventTargetProto, {
  /**
   * 事件处理 => 添加事件1: 获取参数
   */
  $on( types, selector, listener, options ){
    return on( this, types, selector, listener, options );
  },
  /**
   * 事件处理 => 添加事件1: 获取参数
   */
  $one( types, selector, listener, options ){
    return on.call( true, this, types, selector, listener, options );
  },
  /**
   * 事件处理 => 移除事件1: 获取并处理参数
   */
  $off: off
});