import assign from "../../../shared/util/assign";
import add from "./add";
import inBrowser from "../../../shared/const/inBrowser";
import ZenJS from "../../../shared/global/ZenJS/index";
import dispatch from "./dispatch";
import modifiers from "./modifiers";


const EventListener = assign( false, [
  null, {
    add: add,
    dispatch: dispatch,
    modifiers: modifiers
  }
]);

if( inBrowser ){
  ZenJS.EventListener = EventListener;
}

export default EventListener;