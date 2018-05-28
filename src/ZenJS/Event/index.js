import ZenJS from "../../shared/global/ZenJS/index";
import returnFalse from '../../shared/util/returnFalse';
import returnTrue from '../../shared/util/returnTrue';
import $assign from "../../Object/$assign";
import defineProperty from "../../shared/global/Object/defineProperty";
import assign from "../../shared/global/Object/assign";
import { defineGetPropertyOptions } from "../../shared/const/definePropertyOptions";

/**
 * event.target : 触发事件的元素
 * event.originalTarget : 绑定事件的元素, 如果是委托代理, 则为代理的元素
 * event.delegateTarget : 绑定事件的元素
 * event.relatedTarget : 事件的相关节点, mouseover 时移出的节点, mouseout 时移入的节点
 */


export default function Event( src, props ){

  if( this instanceof ZenJS.Event === false ){
    return new ZenJS.Event( src, props );
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

}

ZenJS.Event = Event;

const EventProto = ZenJS.Event.prototype = {
  constructor: ZenJS.Event,
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
].forEach( ref => {
  const fn = ref[ 0 ],
        judgement = ref[ 1 ];

  EventProto[ fn ] = function(){
    let event;

    if( EventProto[ judgement ]() ){
      return;
    }else{
      EventProto[ judgement ] = returnTrue;
    }

    if( !EventProto.isSimulated && ( event = EventProto.originalEvent ) ){
      event[ fn ]();
    }
  }
});


function addProp( name, get, set ){
  defineProperty(
    EventProto, name, assign( {}, defineGetPropertyOptions, {
      get: get || function(){
        const originalEvent = this.originalEvent;
        if( originalEvent ){
          return originalEvent[ name ];
        }
      },
      set: set || function( value ){
        this[ name ] = value;
      }
    })
  );
};

Event.addProp = addProp;

[
  'altKey',
  'bubbles',
  'cancelable',
  'changedTouches',
  'ctrlKey',
  'detail',
  'eventPhase',
  'metaKey',
  'pageX',
  'pageY',
  'shiftKey',
  'view',
  'char',
  'charCode',
  'key',
  'keyCode',
  'button',
  'buttons',
  'clientX',
  'clientY',
  'offsetX',
  'offsetY',
  'pointerId',
  'pointerType',
  'screenX',
  'screenY',
  'targetTouches',
  'toElement',
  'touches'
].forEach( name => addProp( name ) );