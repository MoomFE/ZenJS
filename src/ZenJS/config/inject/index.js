import $create from "../../../Object/$create/index";
import defineProperty from "../../../shared/global/Object/defineProperty";
import isBoolean from "../../../shared/util/isBoolean";
import { supportsEventTarget } from "../../../shared/supports/event-target";
import EventTarget from "../../../shared/global/EventTarget/index";
import defineValue from "../../../shared/util/defineValue";
import { addEventListener, removeEventListener, addEventListenerPrivate, removeEventListenerPrivate } from "../../../shared/const/event";


const inject = $create( true );


/**
 * 事件
 */
var event;

defineProperty( inject, 'event', {
  get: () => event,
  set: val => {
    if( !isBoolean( val ) || event === val ) return false;
    if( event = val ){
      if( supportsEventTarget ){
        defineValue( EventTarget, addEventListener, EventTarget.$on );
        defineValue( EventTarget, removeEventListener, EventTarget.$off );
      }else{
        EventTarget.forEach( obj => {
          defineValue( obj, addEventListener, obj.$on );
          defineValue( obj, removeEventListener, obj.$off );
        });
      }
    }else{
      if( supportsEventTarget ){
        defineValue( EventTarget, addEventListener, EventTarget[ addEventListenerPrivate ] );
        defineValue( EventTarget, removeEventListener, EventTarget[ removeEventListenerPrivate ] );
      }else{
        EventTarget.forEach( obj => {
          defineValue( obj, addEventListener, obj[ addEventListenerPrivate ] );
          defineValue( obj, removeEventListener, obj[ removeEventListenerPrivate ] );
        });
      }
    }
  },
  enumerable: true
});

export default inject;