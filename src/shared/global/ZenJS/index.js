import $create from '../../../Object/$create/index';
import inBrowser from '../../const/inBrowser';

/**
 * ZenJS
 */
const ZenJS = $create( true, {
  version: '__VERSION__'
});

if( inBrowser ){
  window.Zen = window.ZenJS = ZenJS;
}

export default ZenJS;