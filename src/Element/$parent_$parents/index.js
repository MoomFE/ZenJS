import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import inBrowser from "../../shared/const/inBrowser";
import { Filter } from "./util";


inBrowser && defineValue( ElementProto, {
  $parent( filter, checkSelf ){
    return Filter( this.parentElement, filter, null, true );
  },
  $parents( filter, checkSelf ){
    return Filter( this, filter, 'parentElement', checkSelf );
  }
});