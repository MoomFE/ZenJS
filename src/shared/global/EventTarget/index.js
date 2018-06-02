import ElementProto from "../Element/prototype/index";
import { supportsEventTarget } from "../../supports/event-target";

const EventTarget = supportsEventTarget
                      ? window.EventTarget.prototype
                      : [ window, document, ElementProto ];

export default EventTarget;