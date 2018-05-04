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

import { document } from '../../../var/index';
import Zen from '../../../var/Zen';
import winDocEle from '../../../var/winDocEle';
import event from './event';
import rnothtmlwhite from '../../../var/regexp/rnothtmlwhite';

import define from '../../../fn/define/defineValue';
import isObject from '../../../fn/isObject';


const
  rkeyEvent = /^key/,
  rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
  rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue(){
  return true;
}

function returnFalse(){
  return false;
}

function safeActiveElement(){
  try{
    return document.activeElement;
  }catch( err ){}
}

function on( elem, types, selector, options, fn ){

  // on( elem, {}, selector, options )
  if( isObject( types ) ){

    // on( elem, {}, options )
    if( typeof selector !== 'string' ){

      options = options || selector;
      selector = undefined;
    }
    for( let type in types ){
      on( elem, type, selector, options, types[ type ] );
    }
    return elem;
  }

  // on( elem, types, fn )
  if( options == null && fn == null ){
    fn = selector;
    options = selector = undefined;
  }
  // on( elem, types, selector || options, fn )
  else if( fn == null ){

    // on( elem, types, selector, fn )
    if( typeof selector === 'string' ){
      fn = options;
      options = undefined;
    }
    // on( elem, types, options, fn )
    else{
      fn = options;
      options = selector;
      selector = undefined;
    }
  }

  if( fn === false ){
    fn = returnFalse
  }else if( !fn ){
    return elem;
  }

  if( options && options.once ){
    let origFn = fn;
    fn = function( event ){
      elem.$off( event );
      return origFn.apply( this, arguments );
    }

    fn.guid = origFn.guid || Zen.guid;
  }

  types = ( types || '' ).match( rnothtmlwhite ) || [ '' ];

  return event.add( elem, types, fn, options, selector ),
         elem;
}


define( winDocEle, '$on', function( types, selector, fn, options ){
  return on( this, types, selector, options, fn );
});