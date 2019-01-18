import equals from "../../../1. Core/1. Array/$equals/index";
import each from "../../../1. Core/3. Object/$each/index";
import isArray from "../../../shared/global/Array/isArray";

/**
 * 事件处理 => 功能性命名空间
 * @private
 * @param {String} name 需要解析哪一块的功能命名空间
 * @param {String[]} namespace 元素的命名空间列表
 * @param {EventTarget} elem 绑定事件的元素
 * @param {String} type 绑定的事件
 * @param {Object} options 其他属性
 */
export default function modifiers( name, namespace, elem, type, options ){

  // 没有命名空间
  if( namespace.length === 0 ){
    return;
  }

  return CheckForHandlers( ModifiersList[ name ], name, namespace, elem, type, options );
}

/**
 * @param {any} handlers 当前功能的修饰符列表
 */
function CheckForHandlers( handlers, name, namespace, elem, type, options ){
  let result;

  namespace.filter( name => name in handlers )
           .$each( handler => {
             return result = handlers[ handler ]( elem, type, options, namespace );
           });

  if( result !== false && handlers._next ){
    return CheckForHandlers( handlers._next, name, namespace, elem, type, options );
  }

  return result;
}


const ModifiersList = {
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
    self( elem, type, event ){
      return event.target === event.currentTarget;
    }

  },
  /**
   * 触发事件的修饰符通过之后的下一步检测
   */
  dispatched: {

    /**
     * 阻止事件冒泡
     */
    stop( elem, type, event ){
      event.stopPropagation();
    },

    /**
     * 阻止浏览器默认事件
     */
    prevent( elem, type, event ){
      event.preventDefault();
    }

  }
};


const add = ModifiersList.add;
const dispatch = ModifiersList.dispatch;
      dispatch._next = ModifiersList.dispatched;


/**
 * .once || .one
 * 当命名空间有 .once 或 .one, 则会去已绑定的事件中进行查找,
 * 如果之前绑定过相同的命名空间 ( 也同样有 .once 或 .one ), 则本次绑定无效
 */
add.once = add.one = function( elem, type, events, namespace ){
  events = events[ type ] || [];
  return events.$findIndex( { namespace }, equals ) === -1;
};

/**
 * .ctrl || .shift || .alt || .meta
 * 当按下了对应键盘按键时才触发回调
 */
[ 'ctrlKey', 'shiftKey', 'altKey', 'metaKey' ].forEach( key => {
  dispatch[ key ] = function( elem, type, event ){
    return !!event[ key ];
  }
});

/**
 * .left || .middle || .right
 * 当按下了对应鼠标按键时才触发回调
 */
[ 'left', 'middle', 'right' ].forEach(( button, index ) => {
  dispatch[ button ] = function( elem, type, event ){
    return 'button' in event && event.button === index;
  }
});

/**
 * 按下了相应的键盘按键则触发
 */
each({
  keyEsc: 27,
  keyTab: 9,
  keyEnter: 13,
  keySpace: 32,
  keyUp: 38,
  keyLeft: 37,
  keyRight: 39,
  keyDown: 40,
  keyDelete: [ 8, 46 ]
}, ( key, keyCode ) => {
  dispatch[ key ] = function( elem, type, event ){
    if( isArray( keyCode ) ){
      return keyCode.indexOf( event.keyCode ) === -1;
    }
    return event.keyCode === keyCode;
  }
});