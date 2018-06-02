import ZenJS from "../../shared/global/ZenJS/index";
import $create from "../../Object/$create/index";
import inject from "./inject/index";
import keys from "../../shared/global/Object/keys";

const config = ZenJS.config = $create( true );


config.inject = inject;

// 默认开启所有注入项
keys( inject ).forEach( key => {
  inject[ key ] = true;
});