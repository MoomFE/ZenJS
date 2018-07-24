import defineValue from "../../shared/util/defineValue";
import ElementProto from "../../shared/global/Element/prototype/index";
import inBrowser from "../../shared/const/inBrowser";


inBrowser && defineValue( ElementProto, {
  $append: function( elem ){
    return this.appendChild( elem ), this;
  },
  $prepend: function( elem ){
    return this.insertBefore( elem, this.firstElementChild ), this;
  }
});