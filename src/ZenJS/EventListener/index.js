import add from './add';
import dispatch from './dispatch';
import remove from './remove';
import ZenJS from '../../shared/global/ZenJS/index';
import $create from '../../Object/$create/index';

const EventListener = ZenJS.EventListener = $create( true, {
  add,
  dispatch,
  remove
});

export default EventListener;