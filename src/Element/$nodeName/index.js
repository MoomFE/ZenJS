import inBrowser from "../../shared/const/inBrowser";
import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";


inBrowser && defineValue( ElementProto, '$nodeName', function(){
  return this.nodeName.toLowerCase();
});