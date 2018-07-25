import add from './add';
import dispatch from './dispatch';
import remove from './remove';
import emit from './emit';
import modifiers from './modifiers';
import ZenJS from '../../shared/global/ZenJS/index';
import $create from '../../Object/$create/index';
import inBrowser from '../../shared/const/inBrowser';


const EventListener = $create( true, {
  add,
  dispatch,
  remove,
  emit,
  modifiers
});

if( inBrowser ){
  ZenJS.EventListener = EventListener;
}

export default EventListener;