import isObject from "../../../shared/util/isObject";
import isString from "../../../shared/util/isString";
import isBoolean from "../../../shared/util/isBoolean";
import returnTrue from "../../../shared/util/returnTrue";
import returnFalse from "../../../shared/util/returnFalse";
import EventListener from "../../666. ZenJS/EventListener/index";
import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import DomEventTarget from "../../../shared/global/DomEventTarget/index";
import rnothtmlwhite from "../../../shared/const/rnothtmlwhite";

/**
 * 移除事件 => 参数处理
 * @param {*} types 
 * @param {*} selector 
 * @param {*} listener 
 * @param {*} options 
 */
function off( types, selector, listener ){

  // $off( ZenJS.Event )
  if( types instanceof ZenJS.Event ){
    const handleOptions = types.handleOptions;
    const namespace = handleOptions.namespaceStr;
    const types = namespace ? `${ handleOptions.type }.${ namespace }` : handleOptions.type;

    return off.call(
      handleOptions.delegateTarget,
      types,
      handleOptions.selector,
      handleOptions.listener
    );
  }

  // $off( object, selector )
  if( isObject( types ) ){
    for( let type in types ){
      off.call( this, type, selector, types[ type ] );
    }
    return this;
  }

  if( !types ) return this;
  else{
    types = types.match( rnothtmlwhite );

    if( types == null || types.length === 0 ){
      return this;
    }
  } 

  // $off( types, listener )
  // $off( types, listener, selector )
  if( selector !== undefined && !isString( selector ) ){
    [ selector, listener ] = [ listener, selector ];
  }

  // $off( types, true || false )
  if( isBoolean( listener ) ){
    listener = listener ? returnTrue : returnFalse;
  }

  EventListener.remove( this, types, listener, selector );

  return this;
}

if( inBrowser ){
  defineValue( DomEventTarget, '$off', off );
}