import defineValue from "../../../shared/util/defineValue";
import ArrayProto from "../../../shared/global/Array/prototype/index";


[ 'push', 'pop', 'unshift', 'shift' ].forEach( key => {
  defineValue( ArrayProto, '$' + key, function(){
    this[ key ].apply( this, arguments );
    return this;
  });
});