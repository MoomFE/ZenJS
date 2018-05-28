import add from './add';
import dispatch from './dispatch';
import remove from './remove';
import ZenJS from '../../shared/global/ZenJS/index';

const EventListener = ZenJS.EventListener = {
  add,
  dispatch,
  remove
}

export default EventListener;