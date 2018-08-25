import defineValue from "../../../shared/util/defineValue";
import ZenJS from "../../../shared/global/ZenJS/index";


const { util, polyfill } = ZenJS;

defineValue( ZenJS, 'install', function( fn ){
  fn( ZenJS, util, polyfill );
  return ZenJS;
});