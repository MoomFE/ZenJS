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
import { groups } from "../../666. ZenJS/EventListener/util";

/**
 * 移除事件 => 参数处理
 * @param {*} types 
 * @param {*} selector 
 * @param {*} listener 
 * @param {*} options 
 */
function off( elem, types, selector, listener ){

  // $off( ZenJS.Event )
  if( types instanceof ZenJS.Event ){
    return offByHandleOptions( types.handleOptions );
  }

  // $off( object, selector )
  // $off({
  //   group: 'group1'
  // })
  if( isObject( types ) ){

    // $off({
    //   group: 'group1'
    // })
    if( 'group' in types ){
      let _groups = groups[ types.group ];

      _groups && _groups.slice().forEach( handleOptions => {
        offByHandleOptions( handleOptions );
      });
    }
    // $off( object, selector )
    else{
      for( let type in types ){
        off( elem, type, selector, types[ type ] );
      }
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

  // $off( types, listener )
  // $off( types, listener, selector )
  if( selector !== undefined && !isString( selector ) ){
    [ selector, listener ] = [ listener, selector ];
  }

  // $off( types, true || false )
  if( isBoolean( listener ) ){
    listener = listener ? returnTrue : returnFalse;
  }

  EventListener.remove( elem, types, listener, selector );

  return elem;
}

function offByHandleOptions( handleOptions ){
  const namespace = handleOptions.namespaceStr;
  const handleTypes = namespace ? `${ handleOptions.type }.${ namespace }` : handleOptions.type;

  return off(
    handleOptions.elem,
    handleTypes,
    handleOptions.selector,
    handleOptions.listener
  );
}

if( inBrowser ){
  defineValue( DomEventTarget, '$off', function( types, selector, listener ){
    const elem = this || window;
    return off( elem, types, selector, listener );
  });
}