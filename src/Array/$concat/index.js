import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import isArray from "../../shared/global/Array/isArray";
import $add from "../$add/index";
import $toArray from "../$toArray/index";


defineValue( ArrayProto, '$concat', function(){
  $toArray( arguments ).forEach( arg => {
    $add(
      this, -1,
      isArray( arg ) ? arg: [ arg ]
    )
  });
  return this;
});