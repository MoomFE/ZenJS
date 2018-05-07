import isObject from '../../../../shared/util/isObject';
import isString from '../../../../shared/util/isString';
import isBoolean from '../../../../shared/util/isBoolean';
import { rnothtmlwhite } from '../../../../shared/index';
import event from '../../../../Zen/event/index';
import { supportsPassiveEvent } from '../../../../shared/supports/passive-event';


/**
 * 事件处理 => 添加事件2: 参数处理
 * @param {Element} elem 需要绑定事件的对象
 * @param {String} types 需要绑定的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} fn 绑定的事件
 * @param {Object} options 事件绑定参数
 */
export default function on( elem, types, selector, fn, options ){
  let events;

  // on( elem, { type: fn || Boolean } )
  // on( elem, { type: fn || Boolean }, options )
  // on( elem, { type: fn || Boolean }, selector )
  // on( elem, { type: fn || Boolean }, selector, options )
  if( isObject( types ) ){
    events = types;

    if( isString( selector ) ){
      options = fn;
    }
    else{
      options = selector;
      selector = undefined;
    }
  }
  // on( elem, selector, { type: fn || Boolean } )
  // on( elem, selector, { type: fn || Boolean }, options )
  else if( isObject( selector ) ){
    events = selector;
    selector = types;
    options = fn;
  }

  if( events ){
    for( let type in events ){
      on( elem, type, selector, events[ type ], options );
    }
    return elem;
  }

  if( types == false || types == null ){
    return;
  }
  else{
    types = types.match( rnothtmlwhite );

    if( types == null || types.length === 0 ){
      return;
    }
  }

  // on( elem, types, fn || Boolean )
  // on( elem, types, fn || Boolean, selector )
  // on( elem, types, fn || Boolean, options || useCapture )
  // on( elem, types, fn || Boolean, selector, options || useCapture )
  if( !isString( selector ) ){
    [ fn, selector ] = [ selector, fn ];

    if( !isString( selector ) ){
      options = selector;
      selector = undefined;
    }
  }

  if( fn == null ){
    return;
  }

  if( isBoolean( fn ) ){
    fn = fn ? returnTrue : returnFalse;
  }

  // useCapture
  if( isBoolean( options ) ){
    options = { capture: options };
  }

  options = options || {};

  if( options.hasOwnProperty('once') ){
    if( options.once ){
      let origFn = fn;

      fn = function( event ){
        elem.$off( event );
        return origFn.apply( this, arguments );
      }
    }

    delete options.once;
  }

  if( !options.hasOwnProperty('capture') ){
    options.capture = false;
  }

  if( options.hasOwnProperty('passive') ){
    if( !options.passive ) delete options.passive;
    if( !supportsPassiveEvent ) delete options.passive;
  }

  return event.add( elem, types, selector, fn, options ),
         elem;
}

function returnTrue(){
  return true;
}
function returnFalse(){
  return false;
}