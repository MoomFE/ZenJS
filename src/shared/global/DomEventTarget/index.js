import ElementProto from "../Element/prototype/index";
import { supportsEventTarget } from "../../supports/event-target";
import defineValue from "../../util/defineValue";
import { addEventListener, removeEventListener, addEventListenerPrivate, removeEventListenerPrivate } from "../../const/event";
import inBrowser from "../../const/inBrowser";
import document from "../Document/index";


/**
 * @type {EventTarget}
 */
const DomEventTarget = supportsEventTarget
                      ? window.EventTarget.prototype
                      : inBrowser
                        ? [ window, document, ElementProto ]
                        : {};

if( supportsEventTarget ){
  defineValue( DomEventTarget, addEventListenerPrivate, DomEventTarget[ addEventListener ] );
  defineValue( DomEventTarget, removeEventListenerPrivate, DomEventTarget[ removeEventListener ] )
}else if( DomEventTarget ){
  DomEventTarget.forEach( obj => {
    defineValue( obj, addEventListenerPrivate, obj[ addEventListener ] );
    defineValue( obj, removeEventListenerPrivate, obj[ removeEventListener ] );
  });
}

export default DomEventTarget;