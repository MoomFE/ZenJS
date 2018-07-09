import defineValue from "../../shared/util/defineValue";
import ArrayProto from "../../shared/global/Array/prototype/index";
import isArray from "../../shared/global/Array/isArray";
import $add from "../$add/index";
import $toArray from "../$toArray/index";
import parametersRest from "../../shared/util/parametersRest";


defineValue( ArrayProto, '$concat', function(){

  $toArray( arguments ).forEach( arg => {
    $add(
      this,
      -1,
      isArray( arg ) ? arg : [ arg ]
    );
  });

  return this;
});

defineValue( ArrayProto, '$concatTo', function( index ){
  const args = parametersRest( arguments, 1 );

  if( !args.length ){
    return this;
  }

  const originLength = this.length;
  let increasedLength = 0;

  if( index < 0 && ( index = originLength + index + 1 ) < 0 ){
    index = 0;
  }

  args.forEach( arg => {
    $add(
      this,
      increasedLength + index,
      isArray( arg ) ? arg : [ arg ]
    );
    // 用于修正 index, 后续的 arg 需要插入到前面的 arg 后面
    increasedLength = this.length - originLength;
  });

  return this;
});