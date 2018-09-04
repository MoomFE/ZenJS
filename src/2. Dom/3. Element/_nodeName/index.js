import inBrowser from "../../../shared/const/inBrowser";
import defineGet from "../../../shared/util/defineGet";
import ElementProto from "../../../shared/global/DomElement/prototype/index";


if( inBrowser ){
  defineGet( ElementProto, '_nodeName', function(){
    return this.nodeName.toLowerCase();
  });
}