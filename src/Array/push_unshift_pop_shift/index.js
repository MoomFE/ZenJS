import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";

'push_unshift_pop_shift'.split('_').forEach( key => {
  defineValue( ArrayProto, `$${ key }`, function(){
    return this[ key ].apply( this, arguments ),
           this;
  });
});