import inBrowser from "../../shared/const/inBrowser";
import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import { Filter } from "../util";


inBrowser && defineValue( ElementProto, '$siblings', function( filter ){
  return Filter(
    Array.from( this.parentElement.children ).$deleteValue( this ),
    filter
  );
});