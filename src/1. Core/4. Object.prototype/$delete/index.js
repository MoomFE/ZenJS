import defineValue from "../../../shared/util/defineValue";
import ObjectProto from "../../../shared/global/Object/prototype/index";
import concat from "../../../shared/global/Array/prototype/concat";


defineValue( ObjectProto, '$delete $remove', function(){

  concat.apply( [], arguments ).forEach( key => {
    delete this[ key ];
  });

  return this;
});