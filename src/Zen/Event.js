import Zen from "../shared/zen";
import returnFalse from '../shared/util/returnFalse';
import returnTrue from '../shared/util/returnTrue';

Zen.Event = function( src, props ){

  if( !( this instanceof Zen.Event ) ){
    return new Zen.Event( src, props );
  }

}

Zen.Event.prototype = {
  constructor: Zen.Event,
  // 是否调用过 event.preventDefault 方法
  isDefaultPrevented: returnFalse,
  // 是否调用过 stopPropagation 方法
  isPropagationStopped: returnFalse,
  // 是否调用过 stopImmediatePropagation 方法
  isImmediatePropagationStopped: returnFalse,
  // 是否是模拟的 event
  isSimulated: false,

  // 阻止浏览器默认事件
  preventDefault(){
    let event;

    if( this.isDefaultPrevented() ){
      return;
    }else{
      this.isDefaultPrevented = returnTrue;
    }

    if( !this.isSimulated && ( event = this.originalEvent ) ){
      event.preventDefault();
    }
  },
  // 停止将事件冒泡到父节点
  stopPropagation(){
    let event;

    if( this.isPropagationStopped() ){
      return;
    }else{
      this.isPropagationStopped = returnTrue;
    }

    if( !this.isSimulated && ( event = this.originalEvent ) ){
      event.stopPropagation();
    }
  },
  // 停止将事件冒泡到父节点且停止当前元素后续事件执行
  stopImmediatePropagation(){
    let event;

    if( this.isImmediatePropagationStopped() ){
      return;
    }else{
      this.isImmediatePropagationStopped = returnTrue;
    }

    if( !this.isSimulated && ( event = this.originalEvent ) ){
      event.stopImmediatePropagation()
    }
  }
}