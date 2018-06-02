import ElementProto from "../Element/prototype/index";
import { supportsEventTarget } from "../../supports/event-target";
import defineValue from "../../util/defineValue";
import { addEventListener, removeEventListener, addEventListenerPrivate, removeEventListenerPrivate } from "../../const/event";

const EventTarget = supportsEventTarget
                      ? window.EventTarget.prototype
                      : [ window, document, ElementProto ];

if( supportsEventTarget ){
  defineValue( EventTarget, addEventListenerPrivate, EventTarget[ addEventListener ] );
  defineValue( EventTarget, removeEventListenerPrivate, EventTarget[ removeEventListener ] )
}else{
  EventTarget.forEach( obj => {
    defineValue( obj, addEventListenerPrivate, obj[ addEventListener ] );
    defineValue( obj, removeEventListenerPrivate, obj[ removeEventListener ] );
  });
}

export default EventTarget;