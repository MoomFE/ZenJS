import Zen from "../../shared/global/Zen/index";
import returnFalse from '../../shared/util/returnFalse';
import returnTrue from '../../shared/util/returnTrue';
import $assign from "../../Object/$assign";
import defineProperty from "../../shared/global/Object/defineProperty";

export default function Event( src, props ){

  if( this instanceof Zen.Event === false ){
    return new Zen.Event( src, props );
  }

  // Event object
  if( src && src.type ){
    this.originalEvent = src;
    this.type = src.type;

    this.isDefaultPrevented =
      src.defaultPrevented ||
      src.defaultPrevented === undefined && src.returnValue === false
        ? returnTrue
        : returnFalse;

    this.target = ( src.target && src.target.nodeType === 3 )
      ? src.target.parentNode
      : src.target;

    this.currentTarget = src.currentTarget;
    this.relatedTarget = src.relatedTarget;
  }
  // Event type
  else{
    this.type = src;
  }

  if( props ){
    $assign( this, props );
  }

  this.timeStamp = src && src.timeStamp || Date.now();

  this[ Zen.varsion ] = true;

}

Zen.Event = Event;

Zen.Event.prototype = {
  constructor: Zen.Event,
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
  [ 'preventDefault', 'isDefaultPrevented' ],
  // 停止将事件冒泡到父节点
  [ 'stopPropagation', 'isPropagationStopped' ],
  // 停止将事件冒泡到父节点且停止当前元素后续事件执行
  [ 'stopImmediatePropagation', 'isImmediatePropagationStopped' ]
].forEach(
  function( ref ){
    const fn = ref[ 0 ],
          judgement = ref[ 1 ];

    this[ fn ] = function(){
      let event;

      if( this[ judgement ]() ){
        return;
      }else{
        this[ judgement ] = returnTrue;
      }

      if( !this.isSimulated && ( event = this.originalEvent ) ){
        event[ fn ]();
      }
    }
  }.bind(
    Zen.Event.prototype
  )
);

const addProp = function( name, hook ){

}.bind(
  Zen.Event.prototype
);