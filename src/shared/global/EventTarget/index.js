import ElementProto from "../Element/prototype/index";
import { supportsEventTarget } from "../../supports/event-target";
import defineValue from "../../util/defineValue";

const EventTarget = supportsEventTarget
                      ? window.EventTarget.prototype
                      : [ window, document, ElementProto ];

if( supportsEventTarget ){
  defineValue( EventTarget, '__ZENJS_EVENT_ADD__', EventTarget.addEventListener );
  defineValue( EventTarget, '__ZENJS_EVENT_REMOVE__', EventTarget.removeEventListener )
}else{
  EventTarget.forEach( obj => {
    defineValue( obj, '__ZENJS_EVENT_ADD__', obj.addEventListener );
    defineValue( obj, '__ZENJS_EVENT_REMOVE__', obj.removeEventListener );
  });
}

export default EventTarget;