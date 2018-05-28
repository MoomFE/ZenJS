import EventListener from '../../ZenJS/EventListener/index';
import rnothtmlwhite from '../../shared/const/rnothtmlwhite';
import { supportsPassiveEvent } from '../../shared/supports/passive-event';

import isObject from '../../shared/util/isObject';
import isString from '../../shared/util/isString';
import isBoolean from '../../shared/util/isBoolean';

import returnFalse from '../../shared/util/returnFalse';
import returnTrue from '../../shared/util/returnTrue';
import ZenJS from '../../shared/global/ZenJS/index';


/**
 * 事件处理 => 添加事件2: 参数处理
 * @param {Element} elem 需要绑定事件的对象
 * @param {String} types 需要绑定的事件集
 * @param {String} selector 事件委托的选择器
 * @param {Function} listener 绑定的事件
 * @param {Object} options 事件绑定参数
 */
export default function on( elem, types, selector, listener, options ){
  let events;

  // on( elem, { type: listener || Boolean } )
  // on( elem, { type: listener || Boolean }, options )
  // on( elem, { type: listener || Boolean }, selector )
  // on( elem, { type: listener || Boolean }, selector, options )
  if( isObject( types ) ){
    events = types;

    if( isString( selector ) ){
      options = listener;
    }
    else{
      options = selector;
      selector = undefined;
    }
  }
  // on( elem, selector, { type: listener || Boolean } )
  // on( elem, selector, { type: listener || Boolean }, options )
  else if( isObject( selector ) ){
    events = selector;
    selector = types;
    options = listener;
  }

  if( events ){
    for( let type in events ){
      on( elem, type, events[ type ], selector, options );
    }
    return elem;
  }

  if( !types ) return elem;
  else{
    types = types.match( rnothtmlwhite );

    if( types == null || types.length === 0 ){
      return elem;
    }
  }

  // on( elem, types, listener || Boolean )
  // on( elem, types, listener || Boolean, selector )
  // on( elem, types, listener || Boolean, options || useCapture )
  // on( elem, types, listener || Boolean, selector, options || useCapture )
  if( !isString( selector ) ){
    [ listener, selector ] = [ selector, listener ];

    if( !isString( selector ) && options == null ){
      options = selector;
      selector = undefined;
    }
  }

  if( listener == null ){
    return elem;
  }

  if( isBoolean( listener ) ){
    listener = listener ? returnTrue : returnFalse;
  }

  if( !listener ){
    return elem;
  }

  // useCapture
  if( isBoolean( options ) ){
    options = { capture: options };
  }

  options = options || {};

  Object.keys( options ).forEach( key => {
    options[ key ] ? options[ key ] = true
                   : delete options[ key ];
  });

  if( 'once' in options || this === true ){
    let origListener = listener;

    listener = function( event ){
      elem.$off( event );
      return origListener.apply( this, arguments );
    }

    listener.guid = origListener.guid || (
      origListener.guid = ZenJS.guid
    );

    delete options.once;
  }

  if( 'passive' in options && !supportsPassiveEvent ){
    delete options.passive;
  }

  return EventListener.add( elem, types, selector, listener, options ),
         elem;
}