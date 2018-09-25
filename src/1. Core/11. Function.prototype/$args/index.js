import defineValue from "../../../shared/util/defineValue";
import FunctionProto from "../../../shared/global/Function/prototype/index";
import keys from "../../../shared/global/Object/keys";


defineValue( FunctionProto, '$args', function( oArgs ){
  const func = this;

  return function(){
    const args = [];
    const currentArgs = arguments;
    const length = keys( oArgs ).length + currentArgs.length;

    let currentIndex = 0;
    let index = 0;
    
    for( ; index < length; index++ ){
      args[ index ] = index in oArgs ? oArgs[ index ]
                                     : currentArgs[ currentIndex++ ];
    }

    return func.apply( this, args );
  };
});