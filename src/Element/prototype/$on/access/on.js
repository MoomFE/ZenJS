import isObject from '../../../../fn/isObject';
import rnothtmlwhite from '../../../../var/regexp/rnothtmlwhite';
import Zen from '../../../../var/Zen';

/**
 * 事件处理 => 添加事件2: 参数处理
 * @param {Element} elem 需要绑定事件的对象
 * @param {String} types 需要绑定的事件集
 * @param {String} selector 事件委托的选择器 
 * @param {Object} options 事件绑定参数
 * @param {Function} fn 绑定的事件
 */
export default function on( elem, types, selector, options, fn ){

  // on( elem, {}, selector, options )
  if( isObject( types) ){

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
    fn = returnFalse;
  }else if( !fn ){
    return elem;
  }

  if( isObject( options ) && options.once ){
    let origFn = fn;
    fn = function( event ){
      elem.$off( event );
      return origFn.apply( this, arguments );
    }

    fn.guid = origFn.guid || Zen.guid;
  }

  types = ( types || '' ).match( rnothtmlwhite ) || [ '' ];

  return Zen.event.add( elem, types, fn, options, selector ),
         elem;
}

function returnFalse(){
  return false;
}