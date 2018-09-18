import assign from "../../../shared/util/assign";
import add from "./add";
import ZenJS from "../../../shared/global/ZenJS/index";
import dispatch from "./dispatch";
import modifiers from "./modifiers";
import remove from "./remove";
import emit from "./emit";


const EventListener = ZenJS.EventListener = assign( false, [
  null, {
    add: add,
    dispatch: dispatch,
    modifiers: modifiers,
    remove: remove,
    emit: emit
  }
]);


export default EventListener;