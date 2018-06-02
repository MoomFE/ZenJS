import defineValue from '../../shared/util/defineValue';
import on from './access/on';
import off from './access/off';
import EventTarget from '../../shared/global/EventTarget/index';
import ZenJS from '../../shared/global/ZenJS/index';

function $one( types, selector, listener, options ){
  return on.call( true, this, types, selector, listener, options );
}

defineValue( EventTarget, {
  /**
   * 事件处理 => 添加事件1: 获取参数
   */
  $on( types, selector, listener, options ){
    return on( this, types, selector, listener, options );
  },
  /**
   * 事件处理 => 添加事件1: 获取参数
   */
  $one,
  $once: $one,
  /**
   * 事件处理 => 移除事件1: 获取并处理参数
   */
  $off: off,

  $emit: function( types ){
    return ZenJS.EventListener.emit( this, types ),
      this;
  }
});