import inBrowser from "../../../shared/const/inBrowser";
import defineValue from "../../../shared/util/defineValue";
import DomEventTarget from "../../../shared/global/DomEventTarget/index";
import EventListener from "../../666. ZenJS/EventListener/index";
import parametersRest from "../../../shared/util/parametersRest";
import rnothtmlwhite from "../../../shared/const/rnothtmlwhite";


/**
 * 触发事件 => 参数处理
 * @param {String} types 
 * @param {any} args 
 */
function emit( types ){

  if( !types ) return this;
  else{
    types = types.match( rnothtmlwhite );

    if( types == null || types.length === 0 ){
      return this;
    }
  }

  EventListener.emit(
    this, types,
    parametersRest( arguments, 1 )
  );

  return this;
}

if( inBrowser ){
  defineValue( DomEventTarget, '$emit', emit );
}