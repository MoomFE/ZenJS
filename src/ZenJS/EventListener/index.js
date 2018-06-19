import add from './add';
import dispatch from './dispatch';
import remove from './remove';
import emit from './emit';
import namespaceHandler from './namespace';
import ZenJS from '../../shared/global/ZenJS/index';
import $create from '../../Object/$create/index';
import inBrowser from '../../shared/const/inBrowser';


const EventListener = $create( true, {
  add,
  dispatch,
  remove,
  emit,
  namespaceHandler
});

if( inBrowser ){
  ZenJS.EventListener = EventListener;
}

export default EventListener;