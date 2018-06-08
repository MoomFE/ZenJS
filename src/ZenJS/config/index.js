import ZenJS from "../../shared/global/ZenJS/index";
import $create from "../../Object/$create/index";
import inject from "./inject/index";
import keys from "../../shared/global/Object/keys";
import event from "./event/index";

const config = ZenJS.config = $create( true );



// 注入到浏览器中的功能, 将会改变浏览器默认行为
config.inject = inject;

// 默认开启所有注入项
keys( inject ).forEach( key => {
  inject[ key ] = true;
});



// 事件相关自定义配置
config.event = event;