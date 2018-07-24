import ZenJS from "../../shared/global/ZenJS/index";
import { supportsPassiveEvent } from "../../shared/supports/passive-event";
import { supportsEventTarget } from "../../shared/supports/event-target";


ZenJS.util.supports = Object.$create( true, {
  passiveEvent: supportsPassiveEvent,
  EventTarget: supportsEventTarget
});