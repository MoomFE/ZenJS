import ElementProto from "../Element/prototype/index";
import { supportsEventTarget } from "../../supports/event-target";
import defineValue from "../../util/defineValue";
import { addEventListener, removeEventListener, addEventListenerPrivate, removeEventListenerPrivate } from "../../const/event";
import inBrowser from "../../const/inBrowser";

const EventTarget = supportsEventTarget
                      ? window.EventTarget.prototype
                      : inBrowser
                        ? [ window, document, ElementProto ]
                        : undefined;

if( supportsEventTarget ){
  defineValue( EventTarget, addEventListenerPrivate, EventTarget[ addEventListener ] );
  defineValue( EventTarget, removeEventListenerPrivate, EventTarget[ removeEventListener ] )
}else if( EventTarget ){
  EventTarget.forEach( obj => {
    defineValue( obj, addEventListenerPrivate, obj[ addEventListener ] );
    defineValue( obj, removeEventListenerPrivate, obj[ removeEventListener ] );
  });
}

export default EventTarget;