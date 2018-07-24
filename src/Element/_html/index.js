import inBrowser from "../../shared/const/inBrowser";
import define from "../../shared/util/define";
import ElementProto from "../../shared/global/Element/prototype/index";


inBrowser && define( ElementProto, '_html', {
  get(){
    return this.innerHTML;
  },
  set( value ){
    this.innerHTML = value;
  }
});