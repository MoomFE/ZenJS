import inBrowser from "../../shared/const/inBrowser";
import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import { Filter } from "../util";


inBrowser && defineValue( ElementProto, {
  '$first $firstChild': function( filter ){
    return Filter( this.firstElementChild, filter, 'nextElementSibling', true );
  },
  '$last $lastChild': function( filter ){
    return Filter( this.lastElementChild, filter, 'previousElementSibling', true );
  }
});