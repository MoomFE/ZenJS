import inBrowser from "../../shared/const/inBrowser";
import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import { Filter } from "../util";
import $toArray from "../../Array/$toArray/index";


inBrowser && defineValue( ElementProto, '$siblings', function( filter ){
  const parent = this.parentElement;

  return parent
    ? Filter(
      $toArray( parent.children ).$deleteValue( this ),
      filter
    )
    : [];
});