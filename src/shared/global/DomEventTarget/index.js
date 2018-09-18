import inBrowser from "../../const/inBrowser";
import ElementProto from "../DomElement/prototype/index";


/**
 * @type {EventTarget}
 */
const DomEventTarget = inBrowser ? 'EventTarget' in window
                                    ? EventTarget.prototype
                                    : [ window, document, ElementProto ]
                                 : undefined;

export default DomEventTarget;